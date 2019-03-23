export default function CheckSafari() {
  var docEl    = document.documentElement, s
  var isSafari = false;
  
  if (docEl && (s = docEl.style)) {
    isSafari = typeof s.WebkitBackdropFilter === "string"
  }
  
  return isSafari
}
