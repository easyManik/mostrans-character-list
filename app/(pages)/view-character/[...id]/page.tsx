"use client";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { consumeAPIDetail } from "@/service/api.service";
import { Card } from "primereact/card";
import moment from "moment";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

const queryClient = new QueryClient();

function ViewDetailCharacter({ params }: { params: { id: string } }) {
  const { data, refetch } = useQuery({
    queryKey: ["character-detail"],
    queryFn: () => consumeAPIDetail(params.id[0]),
  });

  const extractLocationId = (url: string) => {
    const match = url?.match(/\/(\d+)$/);
    return match ? match[1] : null;
  };

  return (
    <div className="bg-gray-100 w-full h-[100vh] p-5">
      <a href={`/`} className="p-5 mb-5">
        <i className="pi pi-arrow-left" style={{ fontSize: "2rem" }}></i>
      </a>
      <br />
      <Card>
        <div className="grid gap-5 h-full">
          <div className=" flex justify-center">
            <Image src={data?.image} alt="" width="350" preview />
          </div>
          <div className="grid gap-3  lg:text-xl text-base">
            <b className="text-2xl">Detail Information</b>
            <div>
              <p className="flex justify-between">Nama : {data?.name}</p>
              <p>Gender : {data?.gender}</p>
              <p>
                Created At :{" "}
                {moment(data?.created).format("DD MMMM YYYY HH:mm:ss")}
              </p>
              <p>Species : {data?.species}</p>
              <p>Status : {data?.status}</p>
            </div>
          </div>
          <div className="lg:flex grid justify-around gap-5 lg:text-xl text-base">
            <div className="grid gap-3">
              <b className="text-2xl">Location Information</b>
              <div className=" grid gap-3">
                <p>Location name : {data?.location?.name}</p>
                <a
                  href={`/view-location/${extractLocationId(
                    data?.location?.url
                  )}`}
                >
                  <Button className="p-5 bg-blue-500 text-white font-bold w-fit">
                    Go To Location
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              <b className="text-2xl">Origin Information</b>
              <div className=" grid gap-3">
                <p>Location name : {data?.origin?.name}</p>
                <a
                  href={`/view-location/${extractLocationId(
                    data?.origin?.url
                  )}`}
                >
                  <Button className="p-5 bg-blue-500 text-white font-bold w-fit">
                    Go To Location
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ViewDetailCharacterWrapper(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewDetailCharacter {...props} />
    </QueryClientProvider>
  );
}
