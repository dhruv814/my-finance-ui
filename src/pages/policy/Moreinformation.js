/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import Palette from '../../theme/palette'
import Addemail from '../../components/email/Addemail'

const Moreinformation = ({ data }) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // dfgdfg
    return (
        <div>
            {/* Add Email Model */}
            <Addemail open={open} handleClose={handleClose} _id={data?._id} receiver={data} />

            <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                <Box p={3}>
                    <Grid container display="flex" spacing={4}>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="h4" pb={2} >Insured Details</Typography>
                                <Typography variant="body1">Insured person's name</Typography>
                                {
                                    data?.contact_id ?
                                        <Link to={`/dashboard/contact/view/${data?.contact_id?._id}`} style={{ textDecoration: "none" }}>
                                            <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.contact_id?.firstName} ${data?.contact_id?.lastName}`}</Typography>
                                        </Link>
                                        :
                                        <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.insuredPersonName}</Typography>
                                }
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Insured person's date of birth</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>
                                    {
                                        data?.insuredPersonDateOfBirth ? dayjs(data?.insuredPersonDateOfBirth).format('MM/DD/YYYY') : "--"
                                    }
                                </Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1"> Relationship to the insured (if applicable)</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.relationshipToTheInsured ? data?.relationshipToTheInsured : "--"}</Typography>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="h4" pb={2} >Insured person's contact information</Typography>
                                <Typography variant="body1"> Phone Number</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.phoneNumber ? data?.phoneNumber : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Email</Typography>
                                <Typography variant="body2" color={Palette.primary.main} onClick={handleOpen} style={{ cursor: "pointer" }}>{data?.emailAddress ? data?.emailAddress : "--"}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} pb={2}>
                            <Typography variant="h4" pb={2}>Policy Premiums and Payments</Typography>
                            <Grid container rowSpacing={2} columnSpacing={4} >
                                <Grid item xs={12} sm={6} >
                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Premium amount</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.premiumAmount ? data?.premiumAmount : "--"}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Premium Frequency</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.premiumFrequency ? data?.premiumFrequency : "--"}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6} >

                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Premium Due Date</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.premiumDueDate ? data?.premiumDueDate : "--"}</Typography>
                                    </Grid>

                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Fund Value</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.fundValue ? data?.fundValue : "--"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}

export default Moreinformation
