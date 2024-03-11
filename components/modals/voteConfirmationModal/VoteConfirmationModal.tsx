import { Button } from "@/components/shared";
import Modal from "../modal/Modal";
import styles from "./VoteConfirmationModal.module.scss";
import Loader from "@/components/shared/loaders/loader/Loader";

interface ModalProps {
	context: {
		title: string;
		description: string;
		okBtnHandler: (option: string) => void;
        actionLoading?: boolean
	};
	openModal: boolean;
	close: () => void;
}

const VoteConfirmationModal = ({ context, openModal, close }: ModalProps) => {
	return (
		<Modal openModal={openModal} title={context?.title} close={close}>
			<div className={styles.modal}>
				<div className={styles.body}>
					<p>{context?.description}</p>
				</div>
				<div className={styles.footer}>
					<Button className={styles.button_cancel} onClick={close}>
						Cancel
					</Button>

					<Button className={styles.button_ok} disabled={context?.actionLoading} onClick={context?.okBtnHandler}>
						Vote &nbsp; {context?.actionLoading && <Loader />}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default VoteConfirmationModal;
