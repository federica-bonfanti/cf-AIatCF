export interface DataStructure {
  meta: {
    month: string;
    theme: {
      footer_note?: string | null;
    };
  };
  featured: {
    featured_item_title: string;
    subject_subtitle: string;
    summary: string;
    link: string;
  };
  tooling: {
    tools: Array<{
      name: string;
      status: 'In Trial' | 'Adopted' | 'Dropped' | 'Evaluating';
    }>;
  };
  client_pipeline: Array<{
    client_name: string;
    project_title: string;
    ask: string;
    answer: string;
    value: string;
  }>;
  weekly_ai_call: {
    metrics: Array<{
      value: string;
      label: string;
    }>;
  };
  evangelist_shoutouts: Array<{
    client_and_project: string;
    lead: string;
    key_metric_large: string;
    key_metric_small: string;
    key_insight: string;
  }>;
}
