"use client";
import Table from "@/components/table";
import Wrapper from "@/components/wrapper";
import useGetRepoList from "@/services/api/useGetRepoList";
import { cn } from "@/utils";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";

const DetailPage = () => {
  const { id } = useParams();
  const { data } = useGetRepoList(id as string);
  const handleCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", { autoClose: 1000 });
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard. Please try again.");
      });
  };

  const columns = [
    {
      title: "Repo Name",
      key: "full_name",
      width: 240,
      render: (value: string) => {
        const nameArr = value ? value.split("/") : [];
        return nameArr.length > 0 ? <div>{nameArr[1]}</div> : null;
      },
    },
    {
      title: "Website URL",
      key: "homepage",
      width: 120,
      render: (value: string) => {
        return value ? (
          <a
            href={value}
            target="#blank"
            className="cursor-pointer font-semibold text-blue-700"
          >
            Go to page
          </a>
        ) : null;
      },
    },
    {
      title: "Homepage",
      key: "html_url",
      render: (value: string) => {
        return (
          <p className="cursor-pointer" onClick={() => handleCopyText(value)}>
            {value}
          </p>
        );
      },
    },
    {
      title: "Language",
      key: "language",
      width: 200,
      render: (value: string) => {
        return <p>{value}</p>;
      },
    },
    {
      title: "Accessibility",
      key: "visibility",
      width: 120,
      render: (value: string) => {
        const isPublic = value === "public";
        return (
          <div
            className={cn(
              "rounded-lg bg-gray-400 px-4 py-1 text-center font-medium capitalize text-white",
              {
                "bg-green-400": isPublic,
              },
            )}
          >
            {value}
          </div>
        );
      },
    },
  ];
  return (
    <Wrapper>
      <div className="min-h-[calc(100vh-277px)] py-6">
        <Table columns={columns} data={data} />
      </div>
    </Wrapper>
  );
};

export default DetailPage;
