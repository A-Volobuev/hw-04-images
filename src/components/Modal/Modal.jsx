import React, {useEffect } from 'react';
import { createPortal } from 'react-dom';

import {Overlay, ModalImg} from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({onClose, hits}) {

	const handleKeyDown = e => {
		if (e.code === "Escape") {
			onClose();
		}
	};
	
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	const handleBackdropClick = e => {
		if(e.currentTarget === e.target) {
			onClose();
		}
	};

	const {largeImageURL, tags} = hits
		return createPortal(
			<Overlay onClick={handleBackdropClick}>
  			<ModalImg>
  			  <img src={largeImageURL} alt={tags} />
  			</ModalImg>
			</Overlay>,
			modalRoot
		)
}


// class Modal extends Component {
// 	componentDidMount() {
// 		// Делаем закрытие модалки через esc
// 		window.addEventListener('keydown', this.handleKeyDown);
//   };

	// componentWillUnmount() {
	// 	window.removeEventListener('keydown', this.handleKeyDown)
  // };

	// handleKeyDown = e => {
	// 	if (e.code === "Escape") {
	// 		this.props.onClose();
	// 	}
	// };

	// handleBackdropClick = e => {
	// 	if(e.currentTarget === e.target) {
	// 		this.props.onClose();
	// 	}
	// };


// 	render() {
// 		const {largeImageURL, tags} = this.props.hits
// 		return createPortal(
// 			<Overlay onClick={this.handleBackdropClick}>
//   			<ModalImg>
//   			  <img src={largeImageURL} alt={tags} />
//   			</ModalImg>
// 			</Overlay>,
// 			modalRoot
// 		)
// 	}
// }

// export default Modal