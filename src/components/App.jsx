import React, { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';

import {AppContainer, LoadMoreBtn} from './App.styled.jsx';
import Searchbar from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

import pixabayAPI from './PixabayAPI/PixabayAPI';

const Status = {
	IDLE: 'idle',
	PENDING: 'pending',
	RESOLVED: 'resolved',
	REJECTED: 'rejected'
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const per_page = 12;
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  // const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  const handlFormSubmit = searchQuery => {
		// console.log(searchQuery);
		// Добавляем значение в наш стейт
		setSearchQuery(searchQuery);
    setPage(1);
	};

  // //! Для изменения запроса
  // useEffect(() => {
  //   if (searchQuery === '') {
  //     return;
  //   }
  //   setStatus(Status.PENDING);
    

  //   pixabayAPI
  //   .fetchImage(searchQuery, page, per_page)
  //   .then(res => {
  //     const { hits, totalHits } = res;
  //     setHits(hits);
  //     setPage(1);
  //     setTotalHits(totalHits);
  //     setStatus(Status.RESOLVED);
  //   })
  //   .catch( error => {
  //     console.log(error);
  //     setStatus(Status.REJECTED);
  //   })
  // }, [searchQuery]);

  //  //! для изменения страницы 
  // useEffect(() => {
  //   if (searchQuery === '') {
  //     return;
  //   }
  //   setStatus(Status.PENDING);

  //   pixabayAPI
  //   .fetchImage(searchQuery, page, per_page)
  //   .then(res => {
  //     const { hits, totalHits } = res;
  //     setHits(state => [...state, ...hits]);
  //     setTotalHits(totalHits);
  //     setStatus(Status.RESOLVED);
  //   })
  //   .catch( error => {
  //     console.log(error);
  //     setStatus(Status.REJECTED);
  //   })
  // }, [page]);

  //! для изменения страницы 
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus(Status.PENDING);

    pixabayAPI
    .fetchImage(searchQuery, page, per_page)
    .then(res => {
      const { hits, totalHits } = res;

      if (page > 1) {
        setHits(state => [...state, ...hits])
      } else {
        setHits(hits);
        setPage(1);
      }
      setTotalHits(totalHits);
      setStatus(Status.RESOLVED);
    })
    .catch( error => {
      console.log(error);
      setStatus(Status.REJECTED);
    })
  }, [searchQuery, page]);


  const onLoadMore = (e) => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

    // this.setState( ({ isModalOpen }) => ({
    //   isModalOpen: !isModalOpen,
    //   imageIndex: null,
    // }));
  };

  const getLargeImage = ({largeImageURL, tags}) => {
    setLargeImage({largeImageURL, tags});
  };

  return (
    <AppContainer>
      <Searchbar  onSubmit={handlFormSubmit}/>

      <ImageGallery 
      hits={hits}
      onClick={toggleModal}
      setLargeImage={getLargeImage}/>

      {status === Status.PENDING && (
        <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#303f9f"/>
      )}

      {totalHits === 0 && (
        <div>По вашему запросу ничего не найдено</div>
      )}

      {totalHits - page * per_page > per_page && (
        <LoadMoreBtn type='button' onClick={onLoadMore}>Load More</LoadMoreBtn>)}

      {isModalOpen && <Modal onClose={toggleModal} 
      hits={largeImage}/>}

      <ToastContainer autoClose={3000} />
    </AppContainer>
  )

}



// export default class App extends Component {
//   // state={
//   //   searchQuery: '',
//   //   page: 1,
//   //   per_page: 12,
//   //   hits: [],
//   //   totalHits: null,
//   //   status: 'idle',
//   //   error: null,
//   //   isModalOpen: false,
//   //   largeImage: null,
//   // }

//   // handlFormSubmit = searchQuery => {
// 	// 	console.log(searchQuery);
// 	// 	//! Добавляем значение в наш стейт
// 	// 	this.setState({searchQuery: searchQuery, isToastShow: false});
// 	// };

//   componentDidUpdate(_, prevState) {
//     const {searchQuery, page, per_page} = this.state;
//     const prevName = prevState.searchQuery;
//     const prevPage = prevState.page;

//     if(prevName !== searchQuery || prevPage !== page){
//       this.setState({status: "pending"});
//       if(prevName !== searchQuery){
//         this.setState({hits:[], page: 1});
//       }
//       // console.log(prevName);
//       // console.log(searchQuery);
//       pixabayAPI
//       .fetchImage(searchQuery, page, per_page)
//       .then(res => {
//         const { hits, totalHits } = res;
//         this.setState(prevState => ({
//           //! Проверяем, если ввели новый запрос - заменяем и распыляем, если нет, тогда добавляем
//           hits: prevName !== searchQuery
//             ? [...hits]
//             : [...prevState.hits, ...hits],
//           totalHits,
//           status: 'resolved',
//         }));
//       })
//       .catch( error => this.setState({error: error, status: "rejected"}))
//     }
//   };

//   onLoadMore = (e) => {
//     this.setState(prevState => ({page: prevState.page +1}));
//   };

//   toggleModal = () => {
//     this.setState( ({ isModalOpen }) => ({
//       isModalOpen: !isModalOpen,
//       imageIndex: null,
//     }));
//   };

//   setLargeImage = ({largeImageURL, tags}) => {
//     this.setState({
//       largeImage: {largeImageURL, tags},
//     });
//   };

//   render() {
//     const {hits, status, totalHits, page, per_page, isModalOpen, largeImage} = this.state;
//     return (
//       <AppContainer>
//         <Searchbar  onSubmit={this.handlFormSubmit}/>

//         {/* Рендерим только если нашли */}
//         {/* {status==="resolved" && (<ImageGallery 
//         hits={hits}
//         onClick={this.toggleModal}
//         setLargeImage={this.setLargeImage}/>)} */}

//         <ImageGallery 
//         hits={hits}
//         onClick={this.toggleModal}
//         setLargeImage={this.setLargeImage}/>

//         {status==="pending" && (
//           <MagnifyingGlass
//           visible={true}
//           height="80"
//           width="80"
//           ariaLabel="magnifying-glass-loading"
//           wrapperStyle={{}}
//           wrapperClass="magnifying-glass-wrapper"
//           glassColor="#c0efff"
//           color="#303f9f"/>
//         )}

// {/* Если здесь добавляю  toast.info('По вашему запросу ничего не найдено'), то оно вызывается оч много раз, по этому оставлю просто надпись  И цифры судя по всему были именно от уведомления*/}
//         {totalHits === 0 && (
//           <div>По вашему запросу ничего не найдено</div>
//         )}

//         {totalHits - page * per_page > per_page && (
//           <LoadMoreBtn type='button' onClick={this.onLoadMore}>Load More</LoadMoreBtn>)}

//         {isModalOpen && <Modal onClose={this.toggleModal} 
//         hits={largeImage}/>}

//         <ToastContainer autoClose={3000} />
//       </AppContainer>
//     )
//   }
// }
