import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../components/common/axios.js";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        api.get("/company")
            .then(res => setCompany(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <CompanyContext.Provider value={company}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);
