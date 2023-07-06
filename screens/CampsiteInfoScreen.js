import RenderCampsite from "../features/campsites/RenderCamspite";

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;

    return <RenderCampsite campsite={campsite} />
}

export default CampsiteInfoScreen;