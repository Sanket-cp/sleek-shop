import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  loading: boolean;
  error: string | null;
}
const OPENCAGE_API_KEY = ""; // OpenCage API key needs to be provided by the user

export function LiveLocation() {
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: null,
    loading: false,
    error: null
  });
  const [apiKey, setApiKey] = useState<string>(OPENCAGE_API_KEY);
  const [showApiInput, setShowApiInput] = useState<boolean>(!OPENCAGE_API_KEY);
  const getLocation = () => {
    if (!apiKey) {
      toast.error("Please enter your OpenCage API key first");
      setShowApiInput(true);
      return;
    }
    setLocationData(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    if (!navigator.geolocation) {
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser"
      }));
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const {
        latitude,
        longitude
      } = position.coords;
      setLocationData(prev => ({
        ...prev,
        latitude,
        longitude,
        loading: true
      }));

      // Now get the address using reverse geocoding
      fetchAddress(latitude, longitude);
    }, error => {
      let errorMessage = "Unable to retrieve your location";
      if (error.code === 1) {
        errorMessage = "Location access denied. Please enable location services.";
      } else if (error.code === 2) {
        errorMessage = "Location unavailable. Please try again later.";
      } else if (error.code === 3) {
        errorMessage = "Location request timed out. Please try again.";
      }
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(errorMessage);
    });
  };
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`);
      if (!response.ok) {
        throw new Error("Failed to fetch address data");
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted;
        setLocationData(prev => ({
          ...prev,
          address,
          loading: false
        }));
        toast.success("Location found successfully!");
      } else {
        setLocationData(prev => ({
          ...prev,
          loading: false,
          error: "No address found for this location"
        }));
        toast.error("No address found for this location");
      }
    } catch (error) {
      setLocationData(prev => ({
        ...prev,
        loading: false,
        error: "Failed to fetch address data"
      }));
      toast.error("Failed to fetch address data. Please check your API key.");
    }
  };
  return <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showApiInput && <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              OpenCage API Key
            </label>
            <div className="flex gap-2">
              <input type="text" id="apiKey" value={apiKey} onChange={e => setApiKey(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Enter your OpenCage API key" />
              <Button variant="outline" onClick={() => setShowApiInput(false)} disabled={!apiKey}>
                Save
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from <a href="https://opencagedata.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenCage</a>
            </p>
          </div>}
        
        {!showApiInput && <div className="text-right mb-2">
            <button onClick={() => setShowApiInput(true)} className="text-xs text-blue-600 hover:underline">
              Change API Key
            </button>
          </div>}

        {locationData.loading ? <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="sr-only">Loading...</span>
          </div> : <div className="space-y-2">
            {locationData.error ? <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {locationData.error}
              </div> : <>
                {locationData.latitude && locationData.longitude ? <div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Latitude</p>
                        <p className="font-medium">{locationData.latitude.toFixed(6)}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Longitude</p>
                        <p className="font-medium">{locationData.longitude.toFixed(6)}</p>
                      </div>
                    </div>
                    
                    {locationData.address && <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm">{locationData.address}</p>
                      </div>}
                  </div> : <p className="text-center text-gray-500 py-4">
                    Click "Get My Location" to detect your current location
                  </p>}
              </>}
          </div>}
      </CardContent>
      <CardFooter>
        <Button onClick={getLocation} disabled={locationData.loading} className="w-full hover:bg-opacity-90 bg-red-500 hover:bg-red-400">
          {locationData.loading ? "Detecting..." : "Get My Location"}
        </Button>
      </CardFooter>
    </Card>;
}