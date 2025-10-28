import React from "react";
import "./Card.css";
import { Outlet, useLocation } from "react-router-dom";

export default function Card() {
  const location = useLocation();

  // Don't show card if path includes "internalresult"
  const hideCard = location.pathname.toLowerCase().includes("internalresult");

  return (
    <>
      {hideCard ? (
        <Outlet />
      ) : (
        <div className="card" id="view">
          <Outlet />
        </div>
      )}
    </>
  );
}
