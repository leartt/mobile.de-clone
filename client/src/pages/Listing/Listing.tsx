import { FC, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import styles from "./Listing.module.scss";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { State } from "../../state/reducers";
import ListingItem from "../../components/ListingItem/ListingItem";
import { getListings } from "../../state/actions/listingActions";
import { useHistory } from "react-router";

const Listing: FC = () => {
  const query = useQuery();

  const dispatch = useDispatch();
  const history = useHistory();
  const { listings, request } = useSelector((state: State) => state.listing);

  useEffect(() => {
    dispatch(
      getListings({
        make: query.get("make") || "",
        model: query.get("model") || "",
        first_registration: query.get("first_registration") || "",
        price: query.get("price") || "",
        mileage: query.get("mileage") || "",
        fuel: query.get("fuel") || "",
        long: query.get("long") || "",
        lat: query.get("lat") || "",
        distanceInKM: query.get("distanceInKM") || "",
      })
    );
  }, []);

  return (
    <div className={styles.Listing}>
      <Container>
        <a className={styles.backLink} onClick={() => history.push("/")}>
          Go back to home page
        </a>
        <div className={styles.ListingWrapper}>
          <div className={styles.ListingItems}>
            {!request.loading ? (
              listings.length > 0 ? (
                listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))
              ) : (
                <span>No listing found</span>
              )
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Listing;
