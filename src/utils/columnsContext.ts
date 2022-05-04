import React, {useContext} from "react";
import {ColumnType} from "../components/Column";

interface ColumnsContextType {
  columns: ColumnType[];
}

export const ColumnsContext = React.createContext<ColumnsContextType>({
  columns: []
});

export const useColumnContext = () => useContext(ColumnsContext);
