import { NavBarDesktop } from "@components";
import { Input } from "@heroui/input";
import { SiteRoute } from "@utils/routes";

const Contact = () => {
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBarDesktop path={SiteRoute.CONTACT} />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col max-w-160 flex-1 gap-4">
          <Input label="Email" />
          <Input label="Subject" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
