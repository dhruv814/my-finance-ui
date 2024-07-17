/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import Palette from '../../theme/palette'

// eslint-disable-next-line arrow-body-style
const Overview = ({ data }) => {
  return (
    <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy Name</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyName ? data?.policyName : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy Insurer Name</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyInsurerName ? data?.policyInsurerName : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy Start Date</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyStartDate ? dayjs(data?.policyStartDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Policy Term</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyTerm ? data?.policyTerm : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Premium Amount</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.premiumAmount ? data?.premiumAmount : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Premium Payment Terms</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.premiumPaymentTerms ? data?.premiumPaymentTerms : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Premium Due Date</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.premiumDueDate ? dayjs(data?.premiumDueDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy Number</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyNumber ? data?.policyNumber : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Policy Type</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyType ? data?.policyType : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy End Date</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyEndDate ? dayjs(data?.policyEndDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy Status</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyStatus ? data?.policyStatus : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Premium Frequency</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.premiumFrequency ? data?.premiumFrequency : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Base Sum Assured</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.baseSumAssured ? data?.baseSumAssured : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Fund Value</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.fundValue ? data?.fundValue : "--"}</Typography>
              </Grid>

              {/* 
        premiumFrequency: "",
        baseSumAssured: "",
        premiumDueDate: "",
        fundValue: "", */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Overview
