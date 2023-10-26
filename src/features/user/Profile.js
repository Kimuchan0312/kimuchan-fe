import useAuth from "../../hooks/useAuth";

function Profile({ profile }) {
  const { user } = useAuth();
  return (
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
  );
}

export default Profile;