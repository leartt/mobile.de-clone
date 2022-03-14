import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getListingByID } from '../../state/actions/listingActions';
import { State } from '../../state/reducers';
import styles from './Listing.module.scss';
import { default as NumberFormat } from 'react-number-format'
import { MdEmail, MdLocalParking } from 'react-icons/md'



interface IMatchParams {
   id: string
}

interface IProps extends RouteComponentProps<IMatchParams> { }


const SingleListing: FC<IProps> = ({ match }) => {

   const history = useHistory();
   const dispatch = useDispatch();
   const { single_listing, request } = useSelector((state: State) => state.listing)

   const [imageSource, setImageSource] = useState<string>('')

   useEffect(() => {
      const { id } = match.params

      dispatch(getListingByID(id));

   }, [])


   return (
      <>
         {request.loading ? 'Loading' :
            !single_listing ? 'No listing found' :
               <div className={styles.SingleListing}>
                  <Container>
                     <a className={styles.backLink}
                        onClick={() => history.goBack()}>Back to search results
                     </a>
                     <Row>
                        <Col xs={12} md={8}>
                           <div className={styles.gallery}>
                              <div className={styles.gallery__head}>
                                 <div className={styles.title}>{single_listing.title}</div>
                                 <div className={styles.price}>
                                    <NumberFormat
                                       value={single_listing.price}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       suffix={'€'} />
                                 </div>
                              </div>
                              <div className={styles.gallery__slider}>
                                 <div className={styles.leftSlides}>
                                    {single_listing.images.map((img: any, idx: number) => {
                                       return <img key={idx} src={`http://localhost:5000/${img}`}
                                          onClick={() => setImageSource(img)}
                                       />
                                    })}
                                 </div>
                                 <div className={styles.mainSlide}>
                                    <img
                                       src={`http://localhost:5000/${imageSource || single_listing.images[0]}`}
                                       alt="" />
                                 </div>
                              </div>
                           </div>
                        </Col>
                        <Col xs={12} md={4}>
                           <div className={styles.contact__info}>
                              <div className={styles.person}>{`${single_listing.user.first_name} ${single_listing.user.last_name}`}</div>
                              <div className={styles.location}>
                                 {single_listing.address.city}{', '}
                                 {single_listing.address.country}
                              </div>
                              <div className={styles.phone}>
                                 {"Tel: " + single_listing.user.phone_number || 'No number found'}
                              </div>
                              <div className={styles.buttons}>
                                 <button className={styles.email}><MdEmail /> E-mail</button>
                                 <button className={styles.parking}><MdLocalParking />Fahrzeug parken</button>
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </Container>
               </div>
         }
      </>
   )
}

export default SingleListing
