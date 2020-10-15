import { $ } from "../core/DOM";

export function Loader() {
  return $.create("div", "loader").html(`
    <div class='lds-spinner'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `
  )
}
