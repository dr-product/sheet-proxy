export default function handler(req, res) {
  // Parse query params (?table=raw_data&compact=1)
  const { table, compact } = req.query;

  // Full schema definition (from your shared data)
  const schema = {
    weighing_input: {
      primary_key: "submission_id",
      columns: [
        "submission_id","form","AC_num","AC_name","PC_num","PC_name","age_group","gender",
        "religion","zone","caste_cleaned_final","caste_final","category_final",
        "sub_caste_muslim_cleaned_final","caste_weighing_final","cm_choice_cleaned_final",
        "cm_choice_cleaned_final_party","cm_choice_final","cm_choice_final_party",
        "ls_past_party_cleaned_final","ls_past_party_final","ls_past_final",
        "ls_past_weighing_final","vs_past_party_cleaned_final","vs_past_party_final",
        "vs_past_final","vs_past_weighing_final","voting_intention_vs_party_cleaned_final",
        "voting_intention_vs_party_final","voting_intention_vs_weighing_final",
        "voting_intention_ls_party_cleaned_final","voting_intention_ls_party_final",
        "voting_intention_ls_weighing_final","winner_perception_state_cleaned_final",
        "major_problems_cleaned_final","native_language_cleaned_final",
        "occupation_cleaned_final","p1_valid","p2_valid","p3_valid","final_valid",
        "muslim_welfare_party_cleaned_final","vi_mismatch_cleaned_final",
        "voting_intention_vs_party_later_cleaned_final"
      ],
    },

    raw_data: {
      primary_key: "submission_id",
      columns: [
        "submission_id","submission_date","AC_num","AC_name","form","PC_num","PC_name","zone",
        "resp_full_name","voter_id","urban_rural","dr_locality_id","introduction","age",
        "age_group","gender","revised_gender","religion","category","caste_raw","caste",
        "caste_subjective","caste_final","monthly_income","occupation",
        "occupation_subjective","major_problems","major_problems_subjective",
        "vs_past_party_raw","vs_past_party","vs_past_party_subjective","ls_past_party_raw",
        "ls_past_party","ls_past_party_subjective","voting_intention_vs_party_raw",
        "voting_intention_vs_party","voting_intention_vs_party_subjective",
        "voting_intention_vs_party_later_raw","voting_intention_vs_party_later",
        "voting_intention_vs_party_later_subjective","voting_intention_vs_party_final",
        "voting_intention_ls_party_raw","voting_intention_ls_party",
        "voting_intention_ls_party_subjective","cm_choice_raw","cm_choice","cm_choice_party",
        "cm_choice_subjective","party_perception","cm_satisfaction","response_status",
        "duration","mobile_id","introduction_flag","sms_status","call_id","agent_id",
        "rec_path","state_govt_satisfaction","campaign_id","disposition","sub_caste_muslim",
        "sub_caste_muslim_subjective","helptext_1","qualification","survey_panel",
        "muslim_welfare_party_subjective","muslim_welfare_party","native_language",
        "native_language_subjective","pm_satisfaction","vi_mismatch","vi_mismatch_subjective",
        "winner_perception_state","winner_perception_state_subjective",
        "smartphone_confirmation","vendor","survey_id","p1_valid","p2_valid","p3_valid",
        "final_valid","device_name","device_id"
      ],
    },

    weighing_output_scenario: {
      primary_key: ["type", "submission_id"],
      columns: [
        "id","type","state","submission_id","zone","form","age_group","vs_past","caste",
        "gender","ls_past","total","MOE_cal","category","voting_intention_vs_cleaned",
        "voting_intention_vs_cleaned_und_mod","voting_intention_vs_und_mod_raw",
        "total_m_cap_voting_intention_vs_cleaned_und_mod","voting_intention_ls_cleaned",
        "voting_intention_ls_cleaned_und_mod","voting_intention_ls_und_mod_raw",
        "total_m_cap_voting_intention_ls_cleaned_und_mod","cm_choice_cleaned",
        "cm_choice_cleaned_und_mod","cm_choice_und_mod_raw",
        "total_m_cap_cm_choice_cleaned_und_mod","vi_vs_modelled_cleaned",
        "vi_vs_modelled_cleaned_und_mod","vi_vs_modelled_und_mod_raw",
        "total_m_cap_vi_vs_modelled_cleaned_und_mod","weighted_on"
      ],
    },
  };

  // If a table and compact=1 are requested, return only its columns
  if (table && compact === "1") {
    const columns = schema[table]?.columns || [];
    return res.status(200).json({ columns });
  }

  // Otherwise, return summary (table names + primary keys)
  const summary = Object.fromEntries(
    Object.entries(schema).map(([name, def]) => [name, { primary_key: def.primary_key }])
  );

  res.status(200).json(summary);
}
