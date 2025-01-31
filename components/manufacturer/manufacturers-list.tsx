"use client"

// Theme
import { AgGridReact } from 'ag-grid-react';
import React, {
    useState,
    useMemo,
    useEffect
} from 'react';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';

import { useToast } from "@/hooks/use-toast";
import ManufacturerEditSheet from "./manufacturer-edit-sheet";
import ManufacturerDeleleDialog from "./manufacturer-delete-dailog";
import { themeQuartz } from '@ag-grid-community/theming';
import ImageCellRenderer from '@/components/Image-cell-renderer';
const myTheme = themeQuartz
    .withParams({
        accentColor: "#3B82F6",
        backgroundColor: "#020817",
        borderColor: "#1E293B",
        browserColorScheme: "dark",
        chromeBackgroundColor: "#020817",
        columnBorder: false,
        foregroundColor: "#F8FAFC",
        headerBackgroundColor: "#020817",
        headerFontFamily: "inherit",
        headerFontSize: 14,
        rowBorder: true,
        sidePanelBorder: true,
        wrapperBorder: true,
    });

interface DevicesResponse {
    deviceCount: number;
}

interface ItemsResponse {
    itemCount: number;
}

function getDevicesForManufacturer(manufacturerId: string): Promise<number> {
    return fetch(
        `/api/manufacturers?action=getManufacturerDevices&manufacturerId=${manufacturerId}`,
        {
            method: "GET",
        }
    )
        .then((devicesRes) => devicesRes.json())
        .then((devicesData: DevicesResponse) => {
            return devicesData.deviceCount || 0;
        })
        .catch((error) => {
            console.error("Error fetching devices:", error);
            return 0;
        });
}

function getItemsForManufacturer(manufacturerId: string): Promise<number> {
    return fetch(
        `/api/manufacturers?id=${manufacturerId}`,
        {
            method: "GET",
        }
    )
        .then((itemsRes) => itemsRes.json())
        .then((itemsData: ItemsResponse) => {
            return itemsData.itemCount || 0;
        })
        .catch((error) => {
            console.error("Error fetching items:", error);
            return 0;
        });
}
interface IRow {
    image: string;
    name: string;
    siteUrl: string;
    supportEmail: string;
    supportPhone: string;
    supportUrl: string;
    actions: string;
}

export default function ManufacturerList() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rowData, setRowData] = useState<IRow[]>([]);
    const { toast } = useToast();



    useEffect(() => {
        //fetchManufacturersData();
    });

    const rowSelection = useMemo<RowSelectionOptions | 'single' | 'multiple'>(() => {
        return {
            mode: 'multiRow',
        };
    }, []);

    const [columnDefs] = useState<ColDef<IRow>[]>([
        {
            headerName: 'Image',
            field: 'image',
            cellRenderer: 'imageCellRenderer',
            width: 100,
        },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Website', field: 'siteUrl' },
        { headerName: 'Email', field: 'supportEmail' },
        { headerName: 'Phone', field: 'supportPhone' },
        { headerName: 'Support URL', field: 'supportUrl' },
        {
            headerName: 'Button',
            field: 'actions',
            cellRenderer: function ButtonCellRenderer(params: any) {
                return (
                    <>
                        <ManufacturerEditSheet
                            manufacturer={params.data}
                            callback={fetchManufacturersData}
                        />
                        <ManufacturerDeleleDialog
                            manufacturer={params.data}
                            callback={fetchManufacturersData}
                        />
                    </>
                );
            },
        },
    ]);

    const frameworkComponents = {
        imageCellRenderer: ImageCellRenderer,
    };

    return (
        <div
            className=""
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                components={frameworkComponents}
                rowSelection={rowSelection}
                theme={myTheme}
                rowHeight={70}
            />
        </div>
    );
}