import "./global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EventList } from "./feature/event-list";
import { EventBook } from "./feature/event-book";
import { ReserveDetail } from "./feature/reserve-detail";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events">
          <Route index element={<EventList />} />
          <Route path=":eventId/book" element={<EventBook />} />
        </Route>
        <Route path="/reserve/:bookingId" element={<ReserveDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
