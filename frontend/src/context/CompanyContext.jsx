import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../components/common/axios";

const CompanyContext = createContext(null);

export const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        api.get("/company")
            .then(res => {
                setCompany(res.data);
            })
            .catch(err => {
                console.error("Company fetch failed", err);
            });
    }, []);

    return (
        <CompanyContext.Provider value={company}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);
