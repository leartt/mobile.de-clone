import { FC } from 'react';
import styles from './ListingItem.module.scss';
import { default as NumberFormat } from 'react-number-format';
import { Link } from 'react-router-dom';


interface Props {
   listing: any
}

const ListingItem: FC<Props> = ({ listing }) => {

   return (
      <Link to={`/listings/${listing._id}`} className={styles.ListingItem}>
         <div className={styles.ListingItem__imgArea}>
            <img src={`http://localhost:5000/${listing.images[0]}`} alt="" />
         </div>
         <div className={styles.ListingItem__descriptionArea}>
            <h4 className={styles.title}>{listing.title}</h4>
            <div>
               {listing.first_registration.month}/{listing.first_registration.year}
               {', '}{listing.mileage + ' km'}{', '}{listing.performance.kw + ' kW' + '(' + listing.performance.ps + ' Hp)'}
            </div>
            <div>
               {listing.category}, {listing.fuel}, {listing.transmission + ' transmission'}, {listing.doors + ' Doors'}
            </div>
            <div>
               {listing.consumption.combined + 'l/100km(comb.)'}
            </div>
            <div style={{ textDecoration: 'underline', padding: '10px 0' }}>
               {listing.address.city}, {listing.address.country}
            </div>
         </div>
         <div className={styles.ListingItem__financeArea}>
            <div>
               <NumberFormat
                  value={listing.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' €'} />
            </div>
         </div>
      </Link>
   )
}


export default ListingItem
