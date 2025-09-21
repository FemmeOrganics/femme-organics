/*global google -- required for google maps typings*/
"use client";

import { type LocationProps, useData } from "@/app/store";
import { customMapStyle } from "@/lib/map-styles";
import { cn } from "@/lib/utils";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import cookie from "js-cookie";
import { Loader2Icon, MapPinIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AutoComplete, {
  geocodeByLatLng,
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import type { LatLng } from "react-google-places-autocomplete/build/types";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const libraries = ["places" as const];

export function LocationWidget({
  onAddressChange,
  inputClassName,
  placeholder,
  className,
  mapLabel,
  showMap,
  showAutoComplete,
}: {
  onAddressChange: (props: {
    address: string;
    location: string;
    locationId: string;
    latLng: { lat: number; lng: number };
  }) => void;
  inputClassName?: string;
  placeholder?: string;
  className?: string;
  showMap?: boolean;
  mapLabel?: string;
  showAutoComplete?: boolean;
}) {
  const mapOptions = useMemo(
    () => ({
      googleMapsApiKey,
      libraries,
    }),
    [],
  );
  const { isLoaded } = useJsApiLoader(mapOptions);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (marker) {
      marker.setOptions({
        map,
        draggable: true,
      });

      marker.addListener("dragend", async () => {
        const lat = marker.getPosition()?.lat();
        const lng = marker.getPosition()?.lng();
        const latLng: LatLng = { lat, lng } as LatLng;

        const data = await geocodeByLatLng(latLng);

        const address: LocationProps = {
          locationId: data[0].place_id,
          address: data[0].formatted_address,
          latLng,
        };

        if (address) {
          useData.setState({ location: address });
          cookie.set("location", JSON.stringify(address));
        }
      });
    }
  }, [marker, map, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    const latLng: LatLng = { lat, lng } as LatLng;

    const data = await geocodeByLatLng(latLng);

    const address: LocationProps = {
      locationId: data[0].place_id,
      address: data[0].formatted_address,
      latLng,
    };

    if (address) {
      useData.setState({ location: address });
      cookie.set("location", JSON.stringify(address));
    }
  };

  return (
    <div className="grid gap-2">
      {showAutoComplete ? (
        <div className="relative flex items-center">
          <MapPinIcon className="absolute left-2 z-10 h-4 w-4 text-[#94A3B8]" />
          <AutoComplete
            autocompletionRequest={{
              componentRestrictions: {
                country: ["ke"],
              },
            }}
            minLengthAutocomplete={3}
            selectProps={{
              classNames: {
                input: () => `!text-foreground !border-0 ${inputClassName} `,
                control: () =>
                  "!h-6 !overflow-hidden !border-border !bg-background pl-5 shadow-sm",
                container: () => "rounded-2xl !bg-background w-full",
                indicatorsContainer: () => "bg-background",
                valueContainer: () => "!border-0 bg-background",
                menuList: () => "!bg-background border rounded-md shadow-md",
                menu: () => "!bg-background",
              },
              onChange: (props) => {
                if (props) {
                  const value = props.value as {
                    description: string;
                    place_id: string;
                  };
                  const placeId = value.place_id;
                  const address = value.description;
                  geocodeByPlaceId(placeId)
                    .then((res) => getLatLng(res[0]))
                    .then((latLng) => {
                      // go to pos
                      map?.panTo(latLng);
                      marker?.setPosition(latLng);

                      onAddressChange({
                        address,
                        location: address,
                        locationId: placeId,
                        latLng,
                      });
                    })
                    .catch((e) => {
                      toast.error(
                        `An error occurred while fetching location details${
                          (e as Error).message
                        }`,
                      );
                    });
                }
              },
              name: "location-select",
              inputValue,
              placeholder: placeholder ?? "Search for Address",
              onInputChange: (e) => {
                setInputValue(e);
              },
            }}
          />
        </div>
      ) : null}

      {showMap ? (
        <div className="">
          <Label className="text-[14px]">{mapLabel}</Label>
          <div
            className={cn("h-40 w-full overflow-hidden rounded-xl", className)}
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onClick={(e) => onMapClick(e)}
              onLoad={(m) => setMap(m)}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                styles: customMapStyle,
              }}
              zoom={15}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
