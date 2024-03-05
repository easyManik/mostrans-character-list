"use client";
import { consumeAPILocation } from "@/service/api.service";
import { Card } from "primereact/card";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import moment from "moment";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const queryClient = new QueryClient();

const DetailLocation = ({ params }: { params: { id: string } }) => {
  const { data, refetch } = useQuery({
    queryKey: ["character-location"],
    queryFn: () => consumeAPILocation(params.id[0]),
  });

  const extractCharacterId = (rowData: any) => {
    const match = rowData?.match(/\/(\d+)$/);
    const characterId = match ? match[1] : null;
    return characterId;
  };

  return (
    <div className="bg-gray-100 p-5 grid gap-5">
      <Card>
        <div className="grid gap-5 lg:text-lg text-sm">
          <b className="lg:text-2xl text-lg">Information Location</b>
          <div>
            <p>Nama : {data?.name}</p>
            <p>Dimention : {data?.dimension}</p>
            <p>Type : {data?.type}</p>
            <p>
              Created At :{" "}
              {moment(data?.created).format("DD MMMM YYYY HH:mm:ss")}
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <DataTable
          value={data?.residents}
          paginator
          rows={15}
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          className="custom-datatable lg:text-base text-sm"
        >
          <Column
            header="No"
            body={(_, index) => index.rowIndex + 1}
            align={"center"}
            style={{ width: "70px" }}
          ></Column>
          <Column
            field="url"
            header="Link"
            body={(rowData) => (
              <a
                href={`/view-character/${extractCharacterId(rowData)}`}
                className="text-blue-500"
              >
                View Character
              </a>
            )}
            align={"center"}
          ></Column>
        </DataTable>
      </Card>
    </div>
  );
};

export default function ViewDetailCharacterWrapper(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <DetailLocation {...props} />
    </QueryClientProvider>
  );
}
