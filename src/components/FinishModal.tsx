import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getClipboardText } from "../utils/clipboard";

type FinishModalProps = {
  win: boolean;
  lose: boolean;
  letters: string[][];
  hexOfDay: string;
  hexleNumber: number;
};

const FinishModal = ({
  win,
  lose,
  letters,
  hexOfDay,
  hexleNumber,
}: FinishModalProps) => {
  const [showModal, setShowModal] = useState(true);
  const [copyText, setCopyText] = useState("");
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    const lettersText = getClipboardText(letters, win, hexleNumber);
    navigator.clipboard.writeText(lettersText);
    navigator.clipboard
      .writeText(lettersText)
      .then(() => {
        setCopyText("Results have been copied to your clipboard!");
      })
      .catch(() => {
        window.alert("An error occured copying your results :(");
      });
  };

  return (
    <Modal show={(win || lose) && showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{win ? "Congratulations!" : "Better luck tomorrow!"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {win ? "You got it! " : `The answer was #${hexOfDay}! `}
          Press "Share Results" to get a spoiler-free shareable copied to your
          clipboard.
        </p>
        <p className="text-primary">{copyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => copyToClipboard()}>
          Share Results
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinishModal;