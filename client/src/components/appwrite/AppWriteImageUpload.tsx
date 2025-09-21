'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Trash, ImagePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import LoadingSpinner from '../LoadingSpinner'
import { cn } from '@/lib/utils';
import { FileLink, useAppwriteFileUpload } from '@/src/hooks/use-appwrite';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (fileLink: FileLink) => void;
    onRemove: (fileLink: FileLink) => void;
    value: FileLink[];
    imageSize?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    imageSize,
    value
}) => {
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    const {
        uploadFile,
        deleteFile,
        isUploading,
        errors
    } = useAppwriteFileUpload({
        onUploadSuccess: (fileLink) => {
            console.log("The file link", fileLink)
            onChange(fileLink)
        },
        onUploadError: (error, fileName) => {
            console.error(`Upload failed for ${fileName}:`, error.message)
        },
        onDeleteSuccess: (fileId) => {
            console.log(`File ${fileId} deleted successfully`)
        },
        onDeleteError: (error, fileId) => {
            console.error(`Delete failed for ${fileId}:`, error.message)
        }
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleFileUpload = async (file: File) => {
        try {
            await uploadFile(file)
        } catch (error) {
            console.error('Upload error:', error)
        }
    }

    const handleRemove = async (fileLink: FileLink) => {
        try {
            await deleteFile(fileLink.fileId)
            onRemove(fileLink)
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    if (!isMounted) {
        return null
    }

    console.log("values", value)

    return (
        <div className='w-full'>
            <div className='flex items-center w-full'>
                <ScrollArea className='w-full max-w-[800px]'>
                    <div className='flex items-center space-x-5 w-full'>
                        {value?.map((fileLink) => (
                            <div key={fileLink.fileId} className={cn('relative w-[200px] mb-2 h-auto rounded-md overflow-hidden', imageSize)}>
                                <div className='z-10 absolute top-2 right-2'>
                                    <Button 
                                        type='button' 
                                        onClick={() => handleRemove(fileLink)} 
                                        variant="destructive" 
                                        size={'icon'}
                                        // disabled={disabled}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Image
                                    src={fileLink.url}
                                    className='object-cover w-full'
                                    alt={fileLink.name}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation='horizontal'/>
                </ScrollArea>
            </div>
            
            {/* Display upload errors */}
            {Object.entries(errors).map(([key, error]) => (
                <div key={key} className="text-red-500 text-sm mt-2">
                    Error: {error}
                </div>
            ))}
            
            <Button
                type='button'
                disabled={disabled || isUploading}
                variant={'secondary'}
                className='px-1'
                onClick={() => imagePickerRef.current?.click()}
            >
                {isUploading 
                    ? <div className={cn('flex items-center space-x-4', imageSize)}>
                        <LoadingSpinner /> <span>Uploading...</span> 
                    </div> 
                    : <>
                        <ImagePlusIcon className='h-4 w-4 mr-1' />
                        Upload Image
                    </>
                }
            </Button>
            
            <input
                type="file"
                ref={imagePickerRef}
                hidden
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file && file.type.startsWith('image/')) {
                        handleFileUpload(file)
                    }
                    // Clear the input value to allow re-uploading the same file
                    e.target.value = ''
                }}
            />
        </div>
    )
}