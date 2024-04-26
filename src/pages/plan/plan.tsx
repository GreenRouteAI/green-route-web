import { Check } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const Plan : FC = ()=>{
    return(
        <Stack flexWrap='wrap' flexDirection='row' my={3} justifyContent='space-evenly' gap={3}>
          <Card elevation={0} sx={{ flexGrow: 1, borderRadius: '1rem' }}>
            <CardHeader title="Free" ></CardHeader>
            <CardContent sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
              <Stack flexDirection='column' gap={2}>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>10 requests per days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Generate eco-friendly itinerary</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Forecast 3 days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>3D Vision</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Vocal Assistant</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Radio</Typography>
                </Stack>
                <Button type='submit' sx={{ mt: 3 }} variant="contained">
                    Enroll
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ flexGrow: 1, borderRadius: '1rem' }}>
            <CardHeader title="Standard" ></CardHeader>
            <CardContent sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
              <Stack flexDirection='column' gap={2}>
              <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>1000 requests per days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Generate eco-friendly itinerary</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Forecast 7 days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>3D Vision</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Vocal Assistant</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Radio</Typography>
                </Stack>
                <Button type='submit' sx={{ mt: 3 }} variant="contained">
                    Enroll
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ flexGrow: 1, borderRadius: '1rem' }}>
            <CardHeader title="Enterprise" ></CardHeader>
            <CardContent sx={{ width: '100%', height: '100%', p: 2, position: 'relative' }}>
              <Stack flexDirection='column' gap={2}>
              <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Unbounded requests per days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Generate eco-friendly itinerary</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Forecast 15 days</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>3D Vision</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>Vocal Assistant</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={3}>
                    <Check color="success" fontSize="small"/>
                  <Typography alignItems="center" fontSize={15}>500 TV Channels and Radio</Typography>
                </Stack>
                <Button type='submit' sx={{ mt: 3 }} variant="contained">
                    Enroll
                </Button>
              </Stack>
            </CardContent>
          </Card>
      </Stack>
    )
}