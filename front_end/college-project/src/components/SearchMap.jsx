import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { searchProduct } from "./api/ProductForSellApiService";
import { Modal, Button, Form } from "react-bootstrap";

const DUMMY_LOCATION = {
  product: {
    id: "dummy",
    productName: "Map Anchor",
    company: { companyName: "" },
  },
  quantity: 0,
  latitude: -82.8628,
  longitude: 135.0,
  isDummy: true,
};

const SearchMap = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const handleSearch = async () => {
    searchProduct(query).then((response) => {
      console.log(response.data);
      setResults(response.data);
      if (response.data && response.data.length > 0)
        setMapCenter({
          lat: response.data[0].latitude,
          lng: response.data[0].longitude,
        });
    });
  };

  useEffect(() => {
    if (results.length && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      results.forEach((result) => {
        bounds.extend({ lat: result.latitude, lng: result.longitude });
      });
      mapRef.current.fitBounds(bounds);
    } else {
    }
  }, [results]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Add custom styles for modern sidebar and cards
  const sidebarStyles = `
.product-card {
  background: #fff;
  border-radius: 8px;
  margin: 12px 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, border-left 0.2s;
  border-left: 4px solid transparent;
}
.product-card.selected {
  background: #e3f2fd;
  border-left: 4px solid #1976d2;
  box-shadow: 0 4px 16px rgba(25,118,210,0.08);
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(25,118,210,0.10);
}
.product-title {
  font-weight: 600;
  font-size: 16px;
}
.product-company {
  color: #666;
  font-size: 14px;
}
.product-qty {
  color: #888;
  font-size: 13px;
}
`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafbfc",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{sidebarStyles}</style>
      {/* Centered Search Bar (in a container) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 32,
        }}
      >
        <div
          className="card p-4"
          style={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 14,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          <div className="row align-items-center g-2">
            <div className="col-9">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                style={{ borderRadius: 8 }}
              />
            </div>
            <div className="col-3">
              <button
                className="btn btn-primary w-100 btn-lg"
                style={{ borderRadius: 8 }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Space between search bar and map/sidebar section */}
      <div style={{ height: 32 }} />
      {/* Map + Sidebar Section (robust flexbox, always visible sidebar, expanding map) */}
      <div
        style={{
          width: "100vw",
          minHeight: 600,
          display: "flex",
          background: "#fafbfc",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 340,
            minWidth: 320,
            maxWidth: 360,
            height: 600,
            background: "#fff",
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
            boxShadow: "2px 0 8px rgba(0,0,0,0.03)",
            borderRadius: "12px 0 0 12px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              padding: 20,
              borderBottom: "1px solid #e0e0e0",
              fontSize: 20,
              letterSpacing: 0.5,
            }}
          >
            Products
          </div>
          {results
            .filter((r) => !r.isDummy)
            .map((result, idx) => (
              <div
                key={result.product?.id || idx}
                className={`product-card${
                  selectedPlace &&
                  result.product?.id === selectedPlace.product?.id
                    ? " selected"
                    : ""
                }`}
                onClick={() => setSelectedPlace(result)}
              >
                <div className="product-title">
                  {result.product?.productName || "Product"}
                </div>
                <div className="product-company">
                  {result.product?.company?.companyName || "Company"}
                </div>
                <div className="product-qty">Quantity: {result.quantity}</div>
              </div>
            ))}
        </div>
        {/* Map */}
        <div style={{ flex: 1, minWidth: 0, height: 600, overflow: "hidden" }}>
          <div
            style={{
              borderRadius: "0 12px 12px 0",
              overflow: "hidden",
              height: "100%",
              width: "100%",
              boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
            }}
          >
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={mapCenter}
              onLoad={(map) => (mapRef.current = map)}
              zoom={5}
            >
              {results
                .filter((r) => !r.isDummy)
                .map((result, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: result.latitude || 0,
                      lng: result.longitude || 0,
                    }}
                    title={
                      result.name || result.designation || result.companyName
                    }
                    onClick={() => setSelectedPlace(result)}
                  />
                ))}
              {/* Dummy marker (invisible) */}
              {results
                .filter((r) => r.isDummy)
                .map((result, index) => (
                  <Marker
                    key={"dummy"}
                    position={{ lat: result.latitude, lng: result.longitude }}
                    icon={{
                      url: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
                    }}
                  />
                ))}
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.latitude,
                    lng: selectedPlace.longitude,
                  }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div
                    style={{
                      minWidth: 220,
                      maxWidth: 260,
                      padding: 16,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      textAlign: "center",
                      borderRadius: 12,
                      boxShadow: "0 2px 12px rgba(25,118,210,0.10)",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                    >
                      {selectedPlace.product.productName}
                    </h3>
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#555",
                      }}
                    >
                      {selectedPlace.product.company.companyName}
                    </h4>
                    <p style={{ margin: "0 0 12px 0", color: "#555" }}>
                      Quantity: {selectedPlace.quantity}
                    </p>
                    <button
                      style={{
                        width: "100%",
                        padding: "10px 0",
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(25,118,210,0.08)",
                      }}
                      onClick={() => {
                        const params = new URLSearchParams({
                          productName: selectedPlace.product?.productName || "",
                          companyName:
                            selectedPlace.product?.company?.companyName || "",
                          quantity: selectedPlace.quantity || "",
                          productId: selectedPlace.product?.id || "",
                        });
                        window.open(
                          `/order-request?${params.toString()}`,
                          "_blank"
                        );
                      }}
                    >
                      Place Order Request
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMap;
