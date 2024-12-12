import { IUser } from "@/global/types/common.types";
import { ExportOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  user?: IUser;
  userName?: string;
}

const UserCard = (props: IProps) => {
  const { user, userName = "" } = props;
  const router = useRouter();
  return (
    <div className="relative mx-auto w-64 overflow-hidden rounded-2xl bg-cover bg-center shadow-md">
      <div
        onClick={() => router.push(`/${userName}`)}
        className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm cursor-pointer"
      >
        <span className="text-sm font-medium text-white">
          Details <ExportOutlined />
        </span>
      </div>
      <img src={user?.avatar_url || ""} width={256} height={200} alt="avatar" />
      <div className="flex flex-col gap-2 bg-white px-2 py-4">
        <p className="font-bold">{user?.name}</p>
        <p>
          Public Repo:{" "}
          <span className="text-blue-700">{user?.public_repos}</span>
        </p>
        <p>
          Followers: <span className="text-blue-700">{user?.followers}</span>{" "}
        </p>
        <div className="flex gap-2">
          Status:{" "}
          <div className="rounded-2xl bg-green-500 px-4 capitalize text-white">
            {user?.user_view_type}
          </div>
        </div>
        <a
          href={user?.html_url}
          target="#blank"
          className="font-semibold text-blue-700"
        >
          Want to visit user github?
        </a>
      </div>
    </div>
  );
};

export default UserCard;
