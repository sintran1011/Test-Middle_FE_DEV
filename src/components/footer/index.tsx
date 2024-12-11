import React from "react";
import LogoIcon from "@/assets/icons/logo-footer.svg";

const Footer = () => {
  return (
    <footer className="bg-[#001431] py-6 text-white">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex items-center gap-10">
          <div className="mb-4 flex items-center md:mb-0">
            <LogoIcon />
          </div>

          <div className="space-y-2 text-sm">
            <strong >Copyright © 2021 Công Ty TNHH freecracy</strong>
            <p className="mt-4">
              Điện thoại:{" "}
              <a href="tel:+84822534031" className="text-gray-300">
                (84.28) 2253 4031
              </a>
            </p>
            <p>
              Trụ sở chính: Lầu 06, Tòa nhà BCONS TOWER II, Số 42/1, Đường Ung
              Văn Khiêm, Phường 25, Quận Bình Thạnh, TP. HCM
            </p>
            <p>
              Người đại diện: Kazuki Kunimoto Số ĐKKD: 0315334084 Ngày cấp:
              16/10/2018 Nơi cấp: Sở KH&ĐT TP.HCM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
