// @ts-nocheck
/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";

import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { apipost } from '../../service/api';
import Palette from '../../theme/palette';
import AutocompleteDropdown from '../../components/AutocompleteDropdown';


const Add = (props) => {
    const { open, handleClose, setUserAction, _id } = props
    const userid = localStorage.getItem('user_id')


    // -----------  validationSchema
    const validationSchema = yup.object({
        policyInsurerName: yup.string().required("Policy Insurer Name is required"),
        policyName: yup.string().required("Policy Name is required"),
        policyType: yup.string().required("Policy Type is required"),
        policyNumber: yup.string().required("Policy Number is required"),
        policyStartDate: yup.date().required("Policy Start Date is required"),
        policyEndDate: yup.date().required("Policy End Date is required"),
        policyStatus: yup.string().required("Policy Status is required"),
        policyTerm: yup.number().required("Policy Term is required"),
        baseSumAssured: yup.number().required("Base Sum Assured is required"),

        insuredPersonName: yup.string().required("Insured Person Name is required"),
        insuredPersonDateOfBirth: yup.date().required("Date of Birth is required"),
        relationshipToTheInsured: yup.string().required("Relationship To The Insured is required"),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid').required('Phone number is required'),
        emailAddress: yup.string().email('Invalid email').required("Email is required"),
    });

    // -----------   initialValues
    const initialValues = {

        // policy details
        policyInsurerName: "",
        policyName: "",
        policyType: "",
        policyNumber: "",
        policyStartDate: "",
        policyEndDate: "",
        policyStatus: "",
        policyTerm: "",

        // life assured details
        insuredPersonName: "",
        insuredPersonDateOfBirth: "",
        phoneNumber: "",
        emailAddress: "",
        relationshipToTheInsured: "",

        // premium details 
        premiumAmount: "",
        premiumPaymentTerms: "",
        premiumFrequency: "",
        baseSumAssured: "",
        premiumDueDate: "",
        fundValue: "",

        // policy holder detail
        createdBy: userid,
        contact_id: _id
    };

    const [selectedValue, setSelectedValue] = useState(null);

    const [insurerList, setOptions] = useState([
        { value: 'Max Life', label: 'Max Life' },
        { value: 'Future Generali Life', label: 'Future Generali Life' },
        { value: 'SBI Life', label: 'SBI Life' },
        { value: 'HDFC Life', label: 'HDFC Life' },
        { value: 'Aviva Life', label: 'Aviva Life' },
        { value: 'ShriRam Life', label: 'ShriRam Life' },
        { value: 'ICICI Pru Life', label: 'ICICI Pru Life' },
        { value: 'Aditya Birla Sun Life', label: 'Aditya Birla Sun Life' },
        { value: 'Tata AIA Life', label: 'Tata AIA Life' },
        { value: 'Edlwise Life', label: 'Edlwise Life' },
        { value: 'Reliance Life', label: 'Reliance Life' },
    ]);

    const handleOptionsChange = (newOptions) => {
        setOptions(newOptions);
        console.log(newOptions)
    };


    // add policy api
    const addPolicy = async (values) => {
        const data = values
        console.log(data)
        const result = await apipost('policies/policy', data)

        setUserAction(result)

        if (result && result.status === 201) {
            toast.success(result.data.message)
            formik.resetForm();
            handleClose();
        } else {
            toast.error("Something went wrong. Please try again!!")
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addPolicy(values)
        },
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        //backgroundColor: "#2b4054",
                        //color: "white",
                    }}
                >
                    <Typography variant="h6">Add New</Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <Typography style={{ marginBottom: "15px" }} variant="h6">
                                Policy Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >

                                {/* Policy Insurer Name */}
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy Insurer Name</FormLabel>
                                    {/* <FilterableDropdown
                                        id="policyInsurerName"
                                        selectedValue={selectedValue}
                                        placeholder="Select insurer name"
                                        options={insurerList}
                                        onValueChange={(selectedOption) => { if (!!selectedOption) { formik.values.policyInsurerName = selectedOption.value; } handleValueChange(selectedOption) }}
                                        onOptionsChange={handleOptionsChange}
                                        error={formik.touched.policyInsurerName && Boolean(formik.errors.policyInsurerName)}
                                        helperText={formik.touched.policyInsurerName && formik.errors.policyInsurerName}
                                    /> */}
                                    <AutocompleteDropdown
                                        options={insurerList}
                                        selectedValue={selectedValue}
                                        setSelectedValue={(selectedOption) => {
                                            if (!!selectedOption) {
                                                formik.values.policyInsurerName = selectedOption.value;
                                            } else {
                                                formik.values.policyInsurerName = null;
                                            }
                                            setSelectedValue(selectedOption);
                                        }}
                                        onOptionsChange={handleOptionsChange}
                                        placeholder="Select insurer name"
                                        error={formik.touched.policyInsurerName && Boolean(formik.errors.policyInsurerName)}
                                        helpertext={formik.touched.policyInsurerName && formik.errors.policyInsurerName}
                                    />
                                    {/* <TextField
                                        id="policyInsurerName"
                                        name="policyInsurerName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyInsurerName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyInsurerName && Boolean(formik.errors.policyInsurerName)}
                                        helperText={formik.touched.policyInsurerName && formik.errors.policyInsurerName}
                                    /> */}
                                </Grid>
                                {/* Policy Name */}
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy Name</FormLabel>
                                    <TextField
                                        id="policyName"
                                        name="policyName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyName && Boolean(formik.errors.policyName)}
                                        helperText={formik.touched.policyName && formik.errors.policyName}
                                    />
                                </Grid>
                                {/* Policy Number */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Policy Number</FormLabel>
                                    <TextField
                                        id="policyNumber"
                                        name="policyNumber"
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyNumber && Boolean(formik.errors.policyNumber)}
                                        helperText={formik.touched.policyNumber && formik.errors.policyNumber}
                                    />
                                </Grid>
                                {/* Policy Type */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy Type</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyType"
                                            name="policyType"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyType}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyType &&
                                                Boolean(formik.errors.policyType)
                                            }
                                            helperText={
                                                formik.touched.policyType && formik.errors.policyType
                                            }
                                        >
                                            <MenuItem value="Auto Insurance">Auto Insurance</MenuItem>
                                            <MenuItem value="Health Insurance">Health Insurance </MenuItem>
                                            <MenuItem value="Home Insurance">Home Insurance </MenuItem>
                                            <MenuItem value="Life Insurance">Life Insurance </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyType && formik.errors.policyType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                {/* Policy Status */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy Status</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyStatus"
                                            name="policyStatus"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyStatus}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyStatus &&
                                                Boolean(formik.errors.policyStatus)
                                            }
                                            // @ts-ignore
                                            helperText={
                                                formik.touched.policyStatus && formik.errors.policyStatus
                                            }
                                        >
                                            <MenuItem value="ACTIVE">Active</MenuItem>
                                            <MenuItem value="INACTIVE">InActive </MenuItem>
                                            <MenuItem value="CANCELED">Canceled </MenuItem>
                                            <MenuItem value="LAPSED">Lapsed </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyStatus && formik.errors.policyStatus}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                {/* Policy Start Date */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Policy Start Date</FormLabel>
                                    <TextField
                                        name='policyStartDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyStartDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyStartDate && Boolean(formik.errors.policyStartDate)}
                                        helperText={formik.touched.policyStartDate && formik.errors.policyStartDate}
                                    />
                                </Grid>
                                {/* Policy End Date */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Policy End Date</FormLabel>
                                    <TextField
                                        name='policyEndDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.policyEndDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyEndDate && Boolean(formik.errors.policyEndDate)}
                                        helperText={formik.touched.policyEndDate && formik.errors.policyEndDate}
                                    />
                                </Grid>
                                {/* Policy Term */}
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Policy Term</FormLabel>
                                    <TextField
                                        id="policyTerm"
                                        name="policyTerm"
                                        size='small'
                                        type='number'
                                        fullWidth
                                        value={formik.values.policyTerm}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.policyTerm &&
                                            Boolean(formik.errors.policyTerm)
                                        }
                                        helperText={
                                            formik.touched.policyTerm && formik.errors.policyTerm
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Life Insured Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Insured Person Name</FormLabel>
                                    <TextField
                                        name='insuredPersonName'
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonName && Boolean(formik.errors.insuredPersonName)}
                                        helperText={formik.touched.insuredPersonName && formik.errors.insuredPersonName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <TextField
                                        name='insuredPersonDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonDateOfBirth && Boolean(formik.errors.insuredPersonDateOfBirth)}
                                        helperText={formik.touched.insuredPersonDateOfBirth && formik.errors.insuredPersonDateOfBirth}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <TextField
                                        id=""
                                        name="phoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.emailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Relationship to the insured</FormLabel>
                                    <TextField
                                        id="relationshipToTheInsured"
                                        name="relationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.relationshipToTheInsured}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationshipToTheInsured && Boolean(formik.errors.relationshipToTheInsured)}
                                        helperText={formik.touched.relationshipToTheInsured && formik.errors.relationshipToTheInsured}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Premium Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                                marginBottom="2%"
                            >
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Premium Amount</FormLabel>
                                    <TextField
                                        id="premiumAmount"
                                        name="premiumAmount"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumAmount}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Premium Payment Terms</FormLabel>
                                    <TextField
                                        id="premiumPaymentTerms"
                                        name="premiumPaymentTerms"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumPaymentTerms}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormControl fullWidth>
                                        <FormLabel>Premium Frequency</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="premiumFrequency"
                                            name="premiumFrequency"
                                            label=""
                                            size='small'
                                            value={formik.values.premiumFrequency}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                            <MenuItem value="Annually">Annually </MenuItem>
                                            <MenuItem value="Single">Single Premium </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Base Sum Assured</FormLabel>
                                    <TextField
                                        id="baseSumAssured"
                                        name="baseSumAssured"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.baseSumAssured}
                                        onChange={formik.handleChange}
                                        error={formik.touched.baseSumAssured && Boolean(formik.errors.baseSumAssured)}
                                        helperText={formik.touched.baseSumAssured && formik.errors.baseSumAssured}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Next Premium Due Date</FormLabel>
                                    <TextField
                                        name='premiumDueDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumDueDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.premiumDueDate && Boolean(formik.errors.premiumDueDate)}
                                        helperText={formik.touched.premiumDueDate && formik.errors.premiumDueDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <FormLabel>Fund/Surrender Value</FormLabel>
                                    <TextField
                                        id="fundValue"
                                        name="fundValue"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.fundValue}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>

                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={formik.handleSubmit}
                        variant="contained"
                        color="primary">Save</Button>
                    <Button onClick={() => {
                        formik.resetForm()
                        handleClose()
                    }} variant="outlined" color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Add