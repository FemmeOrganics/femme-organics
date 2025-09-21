export type Coordinates = { lat: number; lng: number };
export const myShopCordinates: Coordinates = { lat: -1.2824243, lng: 36.8226444 }


export function haversine(origin: Coordinates, destination: Coordinates): number {
    const R = 6371; // Earth radius in kilometers
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(destination.lat - origin.lat);
    const dLng = toRad(destination.lng - origin.lng);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in kilometers
}


export function calculateDeliveryFee(distanceKm: number): number {
    if (distanceKm <= 2) return 100;
    if (distanceKm <= 5) return 150.00;
    return 5.00 + (distanceKm - 5) * 40; // Additional per km
}


export async function getDrivingDistance(origin: Coordinates, destination: Coordinates, apiKey: string): Promise<number> {
    const originStr = `${origin.lat},${origin.lng}`;
    const destinationStr = `${destination.lat},${destination.lng}`;

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originStr}&destinations=${destinationStr}&key=${apiKey}`
    );

    const data = await response.json();

    if (
        data.status === "OK" &&
        data.rows?.[0]?.elements?.[0]?.status === "OK"
    ) {
        const meters = data.rows[0].elements[0].distance.value;
        return meters / 1000; // Convert to kilometers
    }

    throw new Error("Failed to fetch distance from Google Distance Matrix API");
}

export async function calculateUserDeliveryFee({userLocation}:{
    userLocation: Coordinates,
}) {
    const origin: Coordinates = myShopCordinates
    const destination: Coordinates = userLocation;

    // Option 1: Use Haversine formula (quick estimate)
    const distance = haversine(origin, destination);

    // Option 2: Use actual driving distance via Google API
    // const distance = await getDrivingDistance(origin, destination, apiKey);

    const fee = calculateDeliveryFee(distance);

    console.log(`Distance: ${distance.toFixed(2)} km`);
    console.log(`Delivery Fee: $${fee.toFixed(2)}`);
    return {distance: distance.toFixed(2), fee: fee.toFixed(2)}
}
