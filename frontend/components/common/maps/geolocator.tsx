import React, { useEffect, useMemo, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { DotsThree } from "@phosphor-icons/react";

const Geolocator = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //   init a marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const position = {
        lat: -1.313333,
        lng: 36.7365,
      };

      //map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 10,
        mapId: "My Map Id",
      };

      // SETUP MAP
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      //  place marker on map
      const marker = new Marker({
        map: map,
        position: position,
      });
    };

    initMap();
  }, []);

  return (
    <>
      <main className="my-3 rounded-lg p-3 bg-white shadow-sm">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Geolocator</h3>
          <DotsThree size={24} color="#080808" />
        </div>
        <hr className="text-[#E6E8F0] my-5" />
        <div ref={mapRef} className="rounded-2xl h-[400px]" />
      </main>
    </>
  );
};

export default Geolocator;
