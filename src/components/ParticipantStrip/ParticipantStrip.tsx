import React from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';

import Draggable from 'react-draggable';

const Container = styled('aside')(({ theme }) => ({
  padding: '0.5em',
  overflowY: 'auto',
  [theme.breakpoints.down('xs')]: {
    overflowY: 'initial',
    overflowX: 'auto',
    padding: 0,
    display: 'flex',
  },
}));

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}));

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <Container>
      <Draggable>
        <ScrollContainer>
          <Participant
            participant={localParticipant}
            isSelected={selectedParticipant === localParticipant}
            onClick={() => setSelectedParticipant(localParticipant)}
          />
          {participants.map(participant => (
            <Participant
              key={participant.sid}
              participant={participant}
              isSelected={selectedParticipant === participant}
              onClick={() => setSelectedParticipant(participant)}
            />
          ))}
        </ScrollContainer>
      </Draggable>
    </Container>
  );
}

// const { error, setError } = useAppState();

// return (
//   <Stage>
//     <Layer>
//       <VideoProvider options={connectionOptions} onError={setError}>
//         <Participant
//           participant={localParticipant}
//           isSelected={selectedParticipant === localParticipant}
//           onClick={() => setSelectedParticipant(localParticipant)}
//         />
//         {participants.map(participant => (
//           <Participant
//             key={participant.sid}
//             participant={participant}
//             isSelected={selectedParticipant === participant}
//             onClick={() => setSelectedParticipant(participant)}
//           />
//         ))}
//       </VideoProvider>
//     </Layer>
//   </Stage>
// );
