import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { registerUserApi } from './api/ApiService'
import * as Yup from 'yup';
import {
    GetCountries,
    GetState,
    GetCity,
    GetLanguages, //async functions
} from "react-country-state-city";
import { retrieveAllProductsApi } from './api/ProductApiService'
import { createProductForSellApi, retrieveProductForSellApi, updateProductForSellApi } from './api/ProductForSellApiService'
import AddProductModal from './AddProductModal'

const validationSchema = Yup.object().shape({
    /* email: Yup.string().trim().required('Required!').email('Invalid Email!'),
     password: Yup.string().trim().required('Required!').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/, 'Password lenght must be between 8 to 15 characters, must have atleast one upper case and lower case letter, must have atleast one digit'),
     confirmedPassword: Yup.string().required('Required!')
         .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     fullName: Yup.string().trim().required('Required!').min(5, 'Full name must be greater than 5 characters'),
     city: Yup.string().trim().required('Required!'),
     state: Yup.string().trim().required('Required!'),
     country: Yup.string().trim().required('Required!'),
     postalCode: Yup.string().trim().required('Required!'),
     cellNumber: Yup.string().trim().required('Required!'),*/
});

function ProdcutForSell() {
    const navigate = useNavigate()
    const { id } = useParams()
    const authContext = useAuth();
    const username = authContext.username;
    const [countryid, setCountryid] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const [countries, setCountries] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [allProducts, setAllProducts] = useState([])
    const [productForSell, setProductForSell] = useState({})

    useEffect(() => {
        retrieveAllProducts();
        GetCountries().then((result) => {
            setCountries(result);
        });

        retrieveProdcutForSell();
    },
        [id]

    )

    function retrieveAllProducts() {
        console.log(` retrieveProductCategories `)
        retrieveAllProductsApi().then((res) => {
            console.log(res.data)
            setAllProducts(res.data)
        });

    }

    function retrieveProdcutForSell() {
        if (id !== '-1') {
            console.log(`retrieveProdcut `)
            retrieveProductForSellApi(id)
                .then(response => {
                    console.log(response.data)
                    let tempObj = response.data;
                    tempObj.product = response.data.product && response.data.product.id
                    setProductForSell(tempObj)
                })
                .catch(error => console.log(error))
        }
    }





    function onSubmit(values) {

        values.product = {
            "id": values.product
        }
        values.country = selectedCountry.name;
        values.state = selectedState.name;
        values.city = selectedCity.name;
        console.log(values)
        if (id === '-1') {
            createProductForSellApi('blucodesdev1@gmail.com	', values)
                .then(response => {
                    console.log('====================================================')
                    navigate(`/welcome/${username}`)
                })
                .catch(error => console.log(error))
        } else {
            updateProductForSellApi(id, values)
                .then(response => {
                    console.log('====================================================')
                    navigate(`/welcome/${username}`)
                })
                .catch(error => console.log(error))
        }

    }



    return (
        <div className="Registration">
            <h1>Add Product For sell</h1>

            <Formik initialValues={productForSell}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>

                            <fieldset className="form-group">
                                <label>Select Products:</label><span style={{ color: "red" }}> *</span>
                                <Field as="select" className="form-control" name="product" >
                                    <option value="" >Select</option>
                                    {
                                        allProducts.map((product, i) => <option key={i} value={product.id}> {product.productName}</option>)
                                    }
                                </Field><div>
                                    <a type="button" name="admin_login" onClick={() => setOpenModal(true)} >Add Product</a>
                                </div>
                                {props.errors.product &&
                                    <span className="text-danger">{props.errors.product}</span>
                                }
                                <AddProductModal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)} />

                            </fieldset>


                            <fieldset className="form-group">
                                <label>Quantity For Sale:</label><span style={{ color: "red" }}> *</span>
                                <Field type="number" className="form-control" name="quantity" />
                                {props.errors.quantity &&
                                    <span className="text-danger">{props.errors.quantity}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Unit Price:</label><span style={{ color: "red" }}> *</span>
                                <Field type="number" className="form-control" name="unitPrice" />
                                {props.errors.unitPrice &&
                                    <span className="text-danger">{props.errors.unitPrice}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Product Discount:</label><span style={{ color: "red" }}> *</span>
                                <Field type="number" className="form-control" name="discount" />
                                {props.errors.discount &&
                                    <span className="text-danger">{props.errors.discount}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Address Line1:</label>
                                <Field type="text" className="form-control" name="addressLine1" />
                                {props.errors.addressLine1 &&
                                    <span className="text-danger">{props.errors.addressLine1}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Address Line2:</label>
                                <Field type="text" className="form-control" name="addressLine2" />
                                {props.errors.addressLine2 &&
                                    <span className="text-danger">{props.errors.addressLine2}</span>
                                }
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Country:</label><span style={{ color: "red" }}> *</span>
                                <Field as="select" className="form-control" name="country" onChange={(e) => {
                                    const country = countries[e.target.value]; //here you will get full country object.
                                    setSelectedCountry(country);

                                    GetState(country.id).then((result) => {
                                        setStateList(result);
                                    });
                                }}>
                                    <option value="" >Select</option>
                                    {countries.map((item, index) => (

                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    ))}

                                </Field>
                                {props.errors.country &&
                                    <span className="text-danger">{props.errors.country}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>State:</label><span style={{ color: "red" }}> *</span>
                                <Field as="select" className="form-control" name="state" onChange={(e) => {
                                    const state = stateList[e.target.value]; //here you will get full state object.
                                    setSelectedState(state);
                                    GetCity(selectedCountry.id, state.id).then((result) => {
                                        setCityList(result);
                                    });
                                }}
                                >
                                    <option value="" >Select</option>
                                    {stateList.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                                {props.errors.state &&
                                    <span className="text-danger">{props.errors.state}</span>
                                }
                            </fieldset>
                            <fieldset className="form-group">
                                <label>City:</label><span style={{ color: "red" }}> *</span>
                                <Field as="select" className="form-control" name="city" onChange={(e) => {
                                    const city = cityList[e.target.value]; //here you will get full city object.
                                    setSelectedCity(city);
                                }}>
                                    <option value="" >Select</option>
                                    {cityList.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                                {props.errors.city &&
                                    <span className="text-danger">{props.errors.city}</span>
                                }
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default ProdcutForSell