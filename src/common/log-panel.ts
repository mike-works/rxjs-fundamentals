export function addLogPanelMessage(panelId: string, message: string) {
  if (typeof window === 'undefined') {
    return; // node
  }
  let $panel = document.querySelector(`.log-panel[data-panel-id="${panelId}"]`);
  if ($panel === null) {
    throw new Error(`Log panel w/ id ${panelId} not found`);
  }
  let $panelContents = $panel.querySelector('.log-panel__contents') as HTMLPreElement;
  let existingText = $panelContents.innerText;
  $panelContents.innerText = existingText
    ? `${existingText}
${message}`
    : message;
  $panelContents.scrollIntoView({
    block: 'end'
  });
}
