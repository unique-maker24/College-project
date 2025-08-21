import React, { useEffect, useState } from 'react';
import { createCompanyApi, retrieveAllCompaniesApi } from './api/CompanyApiService';
import { createProductApi } from './api/ProductApiService';
import { retrieveAllCategoriesApi } from './api/ProductCategoryApiService';



const AddProductModal = ({ open, onClose }) => {
    const [allCompanies, setAllCompanies] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [company, setCompany] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productName, setProductName] = useState('')
    const [productCode, setProductCode] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [showCompanyTextBox, setShowCompanyTextBox] = useState(false)
    useEffect(() => {
        retrieveAllCompanies();
        retrieveProductCategories();
    },
        []

    )

    if (!open) return null;

    function retrieveProductCategories() {
        console.log(` retrieveProductCategories `)
        retrieveAllCategoriesApi().then((res) => {
            console.log(res.data)
            setAllCategories(res.data)
        });

    }

    function retrieveAllCompanies() {
        console.log(` retrieveAllCompanies `)
        retrieveAllCompaniesApi().then((res) => {
            console.log(res.data)
            setAllCompanies(res.data)
        });

    }

    function handleCompanyChange(e) {
        setCompany(e.target.value)
        if (e.target.value === 'other') {
            
            setShowCompanyTextBox(true)
        } else {
            setShowCompanyTextBox(false)
            
        }
    }

    function addProduct(product) {
        createProductApi(product).then(res => {
            onClose();
        })
            .catch(error => console.log(error))
    }
    
    function onSubmit() {
        let companyVal = company === 'other' ? newCompanyName : company;
        console.log(`companyVal-->${newCompanyName}`)
        if (company === 'other') {
            console.log('creating company first');
            const param = {companyName: newCompanyName}
            createCompanyApi(param).then(response => {
                    console.log('====================================================')
                    //navigate('/Admin/companies')
                })
                .catch(error => console.log(error))
            /*createCompanyApi(param).then((res) => {
                console.log('res ')
                console.log(res)
                companyVal = res.data.id
                const companyObj = { 'id': companyVal }
                const productCategoryObj = { 'id': productCategory }
                const values = {
                    "company": companyObj,
                    "productCategory": productCategoryObj,
                    "productName": productName,
                    "productCode": productCode,
                    "productDesc": productDesc,
                }
                addProduct(values);
            })*/
                .catch(error => console.log(error))
        } else {
            const companyObj = { 'id': companyVal }
            const productCategoryObj = { 'id': productCategory }
            const values = {
                "company": companyObj,
                "productCategory": productCategoryObj,
                "productName": productName,
                "productCode": productCode,
                "productDesc": productDesc,
            }
            addProduct(values)
        }





    }


    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >

                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className='content'>
                        <fieldset className="form-group">
                            <label>Company:</label><span style={{ color: "red" }}> *</span>
                            <select className="form-control" name="company" onChange={(e) => handleCompanyChange(e)}>
                                <option value="" >Select</option>
                                {
                                    allCompanies.map((company, i) => <option key={i} value={company.id}> {company.companyName}</option>)
                                }
                                <option value="other" >Other</option>
                            </select>


                        </fieldset>
                        {
                            showCompanyTextBox &&

                            <fieldset className="form-group">
                                <label>New Company Name:</label><span style={{ color: "red" }}> *</span>
                                <input type="text" className="form-control" name="otherCompany" onChange={(e) => setNewCompanyName(e.target.value)} />
                            </fieldset>
                        }

                        <fieldset className="form-group">
                            <label>Product Category:</label><span style={{ color: "red" }}> *</span>
                            <select className="form-control" name="productCategory" onChange={(e) => setProductCategory(e.target.value)}>
                                <option value="" >Select</option>
                                {
                                    allCategories.map((category, i) => <option key={i} value={category.id}> {category.categoryName}</option>)
                                }
                            </select>

                        </fieldset>

                        <fieldset className="form-group">
                            <label>Product Name:</label><span style={{ color: "red" }}> *</span>
                            <input type="text" className="form-control" name="productName" onChange={(e) => setProductName(e.target.value)} />

                        </fieldset>
                        <fieldset className="form-group">
                            <label>Product Code:</label><span style={{ color: "red" }}> *</span>
                            <input type="text" className="form-control" name="productCode" onChange={(e) => setProductCode(e.target.value)} />

                        </fieldset>
                        <fieldset className="form-group">
                            <label>Product Description:</label>
                            <textarea className="form-control" name="productDesc" onChange={(e) => setProductDesc(e.target.value)} />

                        </fieldset>

                        <div className="btn btn-success m-5" onClick={onSubmit}>
                            Save
                        </div>

                    </div>

                </div>
            </div>


        </div>
    );


};

export default AddProductModal;