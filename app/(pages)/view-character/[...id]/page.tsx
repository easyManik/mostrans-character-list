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
    <div className="bg-gray-100 w-full h-[100vh] p-3">
      <Card>
        <a href={`/`}>
          <Button
            icon="pi pi-arrow-left"
            rounded
            text
            raised
            severity="secondary"
          />
        </a>
        <br />
        <div className="grid gap-5 h-full">
          <div className="grid">
            <div className="flex justify-center text-center">
              <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                <img
                  src={data?.image}
                  alt=""
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
            </div>
            <div className="grid gap-3 lg:text-base text-sm m-5">
              <b className="lg:text-2xl text-lg flex justify-center">
                Detail Information
              </b>
              <div className="lg:flex grid justify-between">
                <hr />
                <div>
                  <p className="flex justify-center">Nama</p>
                  <b className="flex justify-center">{data?.name}</b>
                  <hr />
                </div>
                <div>
                  <p className="flex justify-center">Gender</p>
                  <b className="flex justify-center">{data?.gender}</b>
                  <hr />
                </div>
                <div>
                  <p className="flex justify-center">Created At</p>
                  <b className="flex justify-center">
                    {moment(data?.created).format("DD MMMM YYYY HH:mm:ss")}
                  </b>
                  <hr />
                </div>
                <div>
                  <p className="flex justify-center">Species</p>
                  <b className="flex justify-center">{data?.species}</b>
                  <hr />
                </div>
                <div>
                  <p className="flex justify-center">Status</p>
                  <b className="flex justify-center">{data?.status}</b>
                  <hr />
                </div>
                <br />
              </div>
            </div>
          </div>
          <hr />
          <div className="lg:flex grid justify-around gap-5 lg:text-lg text-sm">
            <div className="grid gap-3">
              <b className="lg:text-2xl text-lg">Location Information</b>
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
              <b className="lg:text-2xl text-lg">Origin Information</b>
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
