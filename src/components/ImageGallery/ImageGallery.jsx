import React from 'react';

import {ImageGalleryList, ImageGalleryItem, ImageGalleryImg} from './ImageGallery.styled'

export const ImageGallery = ({hits, onClick, setLargeImage}) => {
	// console.log(hits)
	return(
		<ImageGalleryList>
			{hits.map(({id, tags, webformatURL, largeImageURL}) => (
				<ImageGalleryItem key={id}>
					<ImageGalleryImg 
					src={webformatURL} 
					alt={tags} 
					onClick={() => {
						onClick();
						setLargeImage({largeImageURL, tags})
					}}/>
				</ImageGalleryItem>
			))}
		</ImageGalleryList>
	)
}

