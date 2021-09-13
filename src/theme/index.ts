import { extendTheme } from "@chakra-ui/react"
// Global style overrides
import styles from "./styles"
// Foundational style overrides
//import borders from "./foundations/borders"
import Button from "./components/button"

const overrides = {
  styles,
  //borders,
  components: {
    Button
  },
}
export default extendTheme(overrides)