import { FC, useState } from "react";
import { BufferCopyIcon, CopyIcon } from "@/shared/SVGs";

interface ICopyToClipboardButton {
  textToCopy: string;
}

export const CopyToClipboardButton: FC<ICopyToClipboardButton> = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(props.textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000); // Сбрасываем статус "скопировано" через 3 секунды
      })
      .catch((error) => {});
  };
  return <BufferCopyIcon onClick={handleCopyClick} />;
};
