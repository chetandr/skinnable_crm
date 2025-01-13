import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  MenuItem
} from '@mui/material';
import Organization from './interfaces';

const industryTypes = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail"
];

const Form = () => {
  const [formData, setFormData] = React.useState<Organization>({
    organizationName: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: ""
    },
    industryType: "",
    website: "",
    pointsOfContact: [
      { name: "", email: "", mobile: "", designation: "" },
      { name: "", email: "", mobile: "", designation: "" },
      { name: "", email: "", mobile: "", designation: "" }
    ],
    source: ""
  });

  const handleChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field: string, subField: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }));
  };

const handleContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = formData.pointsOfContact.map((contact, i) => (
        i === index ? { ...contact, [field]: value } : contact
    ));
    setFormData(prev => ({ ...prev, pointsOfContact: updatedContacts }));
};

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Organization Form
      </Typography>
      <Grid container spacing={3}>
        {/* Organization Details */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Organization Name"
            fullWidth
            value={formData.organizationName}
            onChange={(e) => handleChange("organizationName", e.target.value)}
          />
          <TextField
            label="Street"
            fullWidth
            value={formData.address.street}
            onChange={(e) => handleNestedChange("address", "street", e.target.value)}
          />
          <TextField
            label="City"
            fullWidth
            value={formData.address.city}
            onChange={(e) => handleNestedChange("address", "city", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="State"
            fullWidth
            value={formData.address.state}
            onChange={(e) => handleNestedChange("address", "state", e.target.value)}
          />
          <TextField
            label="Postal Code"
            fullWidth
            value={formData.address.postalCode}
            onChange={(e) => handleNestedChange("address", "postalCode", e.target.value)}
          />
          <TextField
            label="Industry Type"
            fullWidth
            select
            value={formData.industryType}
            onChange={(e) => handleChange("industryType", e.target.value)}
          >
            {industryTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Website"
            fullWidth
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
          <TextField
            label="Source"
            fullWidth
            value={formData.source}
            onChange={(e) => handleChange("source", e.target.value)}
          />
        </Grid>

        {/* Points of Contact */}
        {formData.pointsOfContact.map((contact, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={3}>
              <TextField
                label={`Contact ${index + 1} Name`}
                fullWidth
                value={contact.name}
                onChange={(e) => handleContactChange(index, "name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={`Contact ${index + 1} Email`}
                fullWidth
                value={contact.email}
                onChange={(e) => handleContactChange(index, "email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={`Contact ${index + 1} Mobile`}
                fullWidth
                value={contact.mobile}
                onChange={(e) => handleContactChange(index, "mobile", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label={`Contact ${index + 1} Designation`}
                fullWidth
                value={contact.designation}
                onChange={(e) => handleContactChange(index, "designation", e.target.value)}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
