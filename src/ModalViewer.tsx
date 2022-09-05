import {ModalType} from "./CommandButtons"
import {ModalHelp} from "./ModalHelp";
import {LevelChooser} from "./LevelChooser";
import {GameAction} from "./setupState";

type ModalViewerProps = {
  type: ModalType,
  onClose: ()=>void,
  dispatcher: React.Dispatch<GameAction>
}

export function ModalViewer(props: ModalViewerProps) {
  if (!props.type) {
    return null;
  } else if (props.type === "help") {
    return <ModalHelp visible={true} onClose={props.onClose} />;
  } else if (props.type === "chooser") {
    return (
      <LevelChooser
        visible={true}
        onClose={props.onClose}
        chooseFn={props.dispatcher}
      />
    );
  } else {
    return null;
  }
}