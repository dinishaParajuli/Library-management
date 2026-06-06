// src/routes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path:"/",
        element: <div>Book Store</div>

    },
]);

export default router;
