import { ID } from "appwrite";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { Client, Storage } from "appwrite";

export interface AppwriteConfig {
  endpoint: string;
  projectId: string;
  bucketId: string;
}

export interface AppwriteClients {
  client: Client;
  storage: Storage;
}

// Environment variables or configuration
export const APPWRITE_CONFIG: AppwriteConfig = {
  endpoint:
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId:
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID! ,
  bucketId:
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID! ,
};

// Create and configure Appwrite client
export const createAppwriteClient = (config: AppwriteConfig): Client => {
  console.log("config >>>>>> ", config)
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

  return client;
};

// Create storage instance
export const createAppwriteStorage = (client: Client): Storage => {
  return new Storage(client);
};

// Factory function to create both client and storage
export const createAppwriteClients = (
  config: AppwriteConfig = APPWRITE_CONFIG,
): AppwriteClients => {
  const client = createAppwriteClient(config);
  const storage = createAppwriteStorage(client);

  return { client, storage };
};

// Utility function to validate configuration
export const validateAppwriteConfig = (config: AppwriteConfig): boolean => {
  return !!(config.endpoint && config.projectId && config.bucketId);
};

// Utility function to extract file ID from URL
export const extractFileIdFromUrl = (url: string): string | null => {
  const fileIdRegex = url.match(/\/files\/([^/]+)/);
  return fileIdRegex ? fileIdRegex[1] : null;
};


export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  fileId: z.string(),
});

export type FileLink = z.infer<typeof fileSchema>;

export interface UploadProgress {
  fileId: string;
  progress: number;
  fileName: string;
}

export interface UseAppwriteFileUploadOptions {
  config?: AppwriteConfig;
  onUploadStart?: (fileName: string) => void;
  onUploadProgress?: (progress: UploadProgress) => void;
  onUploadSuccess?: (fileLink: FileLink) => void;
  onUploadError?: (error: Error, fileName: string) => void;
  onDeleteStart?: (fileId: string) => void;
  onDeleteSuccess?: (fileId: string) => void;
  onDeleteError?: (error: Error, fileId: string) => void;
}

export interface UseAppwriteFileUploadReturn {
  uploadedFiles: FileLink[];
  uploadFile: (file: File) => Promise<FileLink>;
  deleteFile: (fileId: string) => Promise<void>;
  uploadMultipleFiles: (files: File[]) => Promise<FileLink[]>;
  deleteMultipleFiles: (fileIds: string[]) => Promise<void>;
  isUploading: boolean;
  isDeleting: boolean;
  uploadProgress: Record<string, number>;
  errors: Record<string, string>;
  resetFiles: () => void;
}

export const useAppwriteFileUpload = (
  options: UseAppwriteFileUploadOptions = {},
): UseAppwriteFileUploadReturn => {
  const [uploadedFiles, setUploadedFiles] = useState<FileLink[]>([]);
  const [uploadingFileNames, setUploadingFileNames] = useState<string[]>([]);
  const [deletingFileIds, setDeletingFileIds] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const config = options.config || APPWRITE_CONFIG;
  const { storage } = useMemo(() => createAppwriteClients(config), [config]);

  const resetFiles = useCallback(() => {
    setUploadedFiles([]);
    setUploadingFileNames([]);
    setDeletingFileIds([]);
    setUploadProgress({});
    setErrors({});
  }, []);

  const uploadFile = useCallback(
    async (file: File): Promise<FileLink> => {
      // Validate file input
      if (!file || !(file instanceof File)) {
        throw new Error("Invalid file object provided");
      }

      if (file.size === 0) {
        throw new Error("Cannot upload empty file");
      }

      const fileId = ID.unique();
      const fileName = file.name;

      options.onUploadStart?.(fileName);
      setUploadingFileNames((prev) => [...prev, fileName]);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fileName];
        return newErrors;
      });
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

      try {
        // Create file in Appwrite storage
        const response = await storage.createFile(
          config.bucketId,
          fileId,
          file,
          // Appwrite permissions (optional)
          undefined, // You can add permissions here if needed
        );

        // Get file URL
        const fileUrl = storage.getFileView(config.bucketId, response.$id);

        const newFileLink: FileLink = {
          name: response.name,
          url: fileUrl.toString(),
          fileId: response.$id,
        };

        setUploadedFiles((prev) => [...prev, newFileLink]);
        setUploadProgress((prev) => ({ ...prev, [response.$id]: 100 }));

        options.onUploadProgress?.({
          fileId: response.$id,
          progress: 100,
          fileName: response.name,
        });

        options.onUploadSuccess?.(newFileLink);

        return newFileLink;
      } catch (error) {
        const uploadError = error as Error;

        // Enhanced error handling
        let errorMessage = uploadError.message;
        if (errorMessage.includes("File not found in payload")) {
          errorMessage =
            "File upload failed - invalid file data. Please try again.";
        }

        setErrors((prev) => ({ ...prev, [fileName]: errorMessage }));
        options.onUploadError?.(new Error(errorMessage), fileName);
        throw new Error(errorMessage);
      } finally {
        setUploadingFileNames((prev) =>
          prev.filter((name) => name !== fileName),
        );
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }
    },
    [options, storage, config.bucketId],
  );

  const deleteFile = useCallback(
    async (fileId: string): Promise<void> => {
      if (!fileId) {
        throw new Error("File ID is required for deletion");
      }

      options.onDeleteStart?.(fileId);
      setDeletingFileIds((prev) => [...prev, fileId]);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fileId];
        return newErrors;
      });

      try {
        await storage.deleteFile(config.bucketId, fileId);

        setUploadedFiles((prev) =>
          prev.filter((file) => file.fileId !== fileId),
        );
        options.onDeleteSuccess?.(fileId);
      } catch (error) {
        const deleteError = error as Error;
        setErrors((prev) => ({ ...prev, [fileId]: deleteError.message }));
        options.onDeleteError?.(deleteError, fileId);
        throw deleteError;
      } finally {
        setDeletingFileIds((prev) => prev.filter((id) => id !== fileId));
      }
    },
    [options, storage, config.bucketId],
  );

  const uploadMultipleFiles = useCallback(
    async (files: File[]): Promise<FileLink[]> => {
      if (!files || files.length === 0) {
        return [];
      }

      const uploadPromises = files.map((file) => uploadFile(file));
      return Promise.all(uploadPromises);
    },
    [uploadFile],
  );

  const deleteMultipleFiles = useCallback(
    async (fileIds: string[]): Promise<void> => {
      if (!fileIds || fileIds.length === 0) {
        return;
      }

      const deletePromises = fileIds.map((fileId) => deleteFile(fileId));
      await Promise.all(deletePromises);
    },
    [deleteFile],
  );

  const isUploading = uploadingFileNames.length > 0;
  const isDeleting = deletingFileIds.length > 0;

  return {
    uploadedFiles,
    uploadFile,
    deleteFile,
    uploadMultipleFiles,
    deleteMultipleFiles,
    isUploading,
    isDeleting,
    uploadProgress,
    errors,
    resetFiles,
  };
};
