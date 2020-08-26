import { $ } from "@core/DOM";

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $resizerInnerLine = $resizer.find(`.${type}-resize__inner`);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let value;

  if (type === "col") {
    $resizerInnerLine.css({
      height: `calc(${window.getComputedStyle($root.$el).height} - 17px)`,
    });
  } else {
    $resizerInnerLine.css({
      width: window.getComputedStyle($root.$el).width,
    });
  }

  document.onmousemove = (e) => {
    if (type === "col") {
      const delta = Math.floor(e.pageX - coords.right);
      value = coords.width + delta;
      $resizer.css({ right: `${-delta}px` });
    } else {
      const delta = Math.floor(e.pageY - coords.bottom);
      value = coords.height + delta;
      $resizer.css({ bottom: `${-delta}px` });
    }
  };

  document.onmouseup = () => {
    if (type === "col") {
      $parent.css({ width: `${value}px` });
      $resizer.css({ right: 0 });
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => $(el).css({ width: `${value}px` }));
    } else {
      $parent.css({ height: `${value}px` });
      $resizer.css({ bottom: 0 });
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
