declare module "./NodeShooter" {
  function NodeShooter(): (room: any) => {
    cleanup: () => void;
  }
  export default NodeShooter;
}