import { BoxStyled } from "components/styled/BoxStyled";
import React from "react";
import { useTranslation } from "react-i18next";
import Loader from "components/shared/Loader";
import { useProfile } from "hooks/profile/useProfile";
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { MailLockOutlined, ModeEditOutline } from "@mui/icons-material";
// ** images
import coverImg from "assets/images/profile-banner.png"
import logo from "assets/images/logodark.png"
import { useState } from "react";

import ChangePassword from "./ChangePassword";

const ProfileIndex = () => {
  const { t } = useTranslation("index");
  const { data, isLoading } = useProfile();
  const [open, setOpen] = useState()

  const ProfilePicture = styled('img')(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }))

  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("profile")}
          </Typography>
        </Box>

        <BoxStyled sx={{ py: 0 }} >
          <CardMedia
            component='img'
            alt='profile-header'
            image={coverImg}
            sx={{
              height: { xs: 150, md: 250 }
            }}
          />
          <CardContent
            sx={{
              pt: 0,
              mt: -8,
              display: 'flex',
              alignItems: 'flex-end',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}
          >
            <ProfilePicture src={logo} alt='profile-picture' />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                ml: { xs: 0, md: 6 },
                alignItems: 'flex-end',
                flexWrap: ['wrap', 'nowrap'],
                justifyContent: ['center', 'space-between']
              }}
            >
              <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                <Typography variant='h5' sx={{ mb: 5 }}>
                  {data?.admin?.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: ['center', 'flex-start']
                  }}
                >
                  <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.main' } }}>
                    <MailLockOutlined></MailLockOutlined>
                    <Typography sx={{ color: 'text.main' }}>{data?.admin?.email}</Typography>
                  </Box>
                </Box>
              </Box>
              <Button variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpen(true)}>
                <ModeEditOutline />
                change password
              </Button>
            </Box>
          </CardContent>

        </BoxStyled>
        <ChangePassword open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default ProfileIndex
