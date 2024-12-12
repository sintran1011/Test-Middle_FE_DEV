"use client";
import ProfileCard from "@/components/user-card";
import Wrapper from "@/components/wrapper";
import useGetUserProfile from "@/services/api/useGetUserProfile";
import { cn } from "@/utils";
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

const Homepage = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const {
    data: userProfile,
    refetch,
    isFetching,
    isError,
  } = useGetUserProfile(searchKey, enableSearch);
  // dsadasdsadsadas
  const inputRef = useRef<HTMLInputElement>(null);
  const oldHistory = localStorage.getItem("history");

  const handleVisibleDropdown = (e: any) => {
    if (inputRef.current?.contains(e.target)) {
      return setVisible(true);
    } else {
      return setVisible(false);
    }
  };

  useEffect(() => {
    if (oldHistory) {
      const parseHistory = oldHistory ? JSON.parse(oldHistory) : [];
      setHistory(parseHistory);
    }
  }, [oldHistory]);

  const handleSearch = async () => {
    setEnableSearch(true);
    if (!searchKey) {
      return false;
    }
    const res = await refetch();
    if (res.isSuccess) {
      setVisible(true);
      handleSaveHistory();
    }
  };

  const handleSaveHistory = () => {
    const removedDuplicate = [...new Set([...history, searchKey])];
    removedDuplicate.splice(0, removedDuplicate.length - 5);
    const formater = JSON.stringify(removedDuplicate);
    localStorage.setItem("history", formater);
  };

  const handleClearHistory = (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
  ) => {
    e.stopPropagation();
    const clone = [...history];
    clone.splice(idx, 1);
    const formater = JSON.stringify(clone);
    localStorage.setItem("history", formater);
    setHistory(clone);
  };

  const renderHistory = () => {
    return (
      <div className="p-4 pb-0">
        <p className="font-medium text-white">
          <ClockCircleOutlined className="pr-2" />
          Search History
        </p>
        <div className="my-3 flex flex-wrap gap-2 pl-6">
          {history && history.length > 0 ? (
            history.map((i: string, idx: number) => (
              <div
                onClick={() => setSearchKey(i)}
                key={i}
                className="cursor-pointer rounded-lg bg-white p-2"
              >
                {i}
                <CloseCircleOutlined
                  onClick={(e) => handleClearHistory(e, idx)}
                  className="pl-2"
                />
              </div>
            ))
          ) : (
            <p className="font-semibold text-white">No history</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="min-h-[calc(100vh-277px)] py-6">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="relative flex w-[400px] select-none gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <div
              onClick={() => setSearchKey("")}
              className={cn(
                "absolute right-[120px] top-1/2 z-10 -translate-y-1/2 cursor-pointer text-gray-500",
                { hidden: !searchKey },
              )}
            >
              <CloseOutlined />
            </div>
            <input
              ref={inputRef}
              onChange={(e) => {
                //username in github not allowed space
                const value = e.target.value.trim();
                setSearchKey(value);
              }}
              className="h-10 flex-1 rounded-md border-gray-400 p-2 pr-6 focus:outline-none"
              placeholder="Type user ID to search...."
              style={{
                opacity: isFetching ? 0.5 : 1,
              }}
              autoFocus
              value={searchKey}
            />
            <button
              onClick={handleSearch}
              type="button"
              className="h-10 w-fit select-none rounded-lg bg-blue-600 p-2 px-4 text-white"
            >
              <SearchOutlined className="cursor-pointer text-[18px]" />
              <span className="text-center">Search</span>
            </button>
          </div>
          <div
            onClick={handleVisibleDropdown}
            className={cn("w-[400px] rounded-lg bg-black/70 shadow-lg", {
              hidden: !visible,
            })}
          >
            {renderHistory()}
            <div className="border-t border-white" />
            <div className="p-4">
              <ProfileCard user={userProfile} userName={searchKey} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Homepage;
