"use client";
import React from "react";
import { consumeAPI } from "@/service/api.service";
import { useQuery } from "@tanstack/react-query";
import { Card } from "primereact/card";
import Link from "next/link";

const CharacterList = () => {
  const { data, refetch } = useQuery({
    queryKey: ["character-list"],
    queryFn: () => consumeAPI(),
  });

  return (
    <div>
      <div className="flex justify-center text-3xl bg-white p-5">
        <b>Character List</b>
      </div>
      <div className="w-full p-5 bg-gray-100">
        <div className={`lg:grid lg:grid-cols-6 lg:gap-5`}>
          {data?.results.map((a: any, i: any) => (
            <div key={i}>
              <Card>
                <Link href={`/view-character/${a.id}`}>
                  <b className="flex justify-center">{a.name}</b>
                  <img src={a.image} />
                </Link>
              </Card>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
