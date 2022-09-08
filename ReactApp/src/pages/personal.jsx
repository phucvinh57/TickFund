import { ChangePersonalPasswordForm } from "../components/personal/changePersonalPasswordForm"
import { PersonalInfoForm } from "../components/personal/personalInfoForm"
import { PersonalAvatarImage } from "../components/personal/personalAvatarImage"

export default function Personal() {
  return <div className="container row">
    <div className="col-4">
      <PersonalAvatarImage />
    </div>
    <div className="col-8">
      <PersonalInfoForm />
      <hr />
      <ChangePersonalPasswordForm />
    </div>
  </div>
}