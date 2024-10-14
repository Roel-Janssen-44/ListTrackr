import { Suspense } from 'react';
import DeleteProjectForm from '@/app/components/projects/deleteForm';
import {
  fetchProject,
  fetchCustomers,
  fetchProjectInvoices,
  fetchInvoiceTemplates,
} from '@/app/lib/data';
import ProjectInvoices from '@/app/components/invoices/table';
import ProjectTasksTable from '@/app/components/projects/project';
import ProjectHeader from '@/app/components/projects/projectHeader';
import PreviousPage from '@/app/components/previousPage';
import {
  Project,
  Customer,
  Invoice,
  InvoiceTemplateName,
} from '@/app/lib/definitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project',
};

export default async function ProjectView({
  params,
}: {
  params: { id: string };
}) {
  const projectId = params.id;
  const project: Project = await fetchProject(projectId);
  const customers: Customer[] = await fetchCustomers();
  const invoices: Invoice[] = await fetchProjectInvoices(projectId);
  const templates: InvoiceTemplateName[] = await fetchInvoiceTemplates();

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {project.title}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <DeleteProjectForm projectId={projectId} />
        </div>
      </div>

      <Suspense fallback={'Loading...'}>
        <ProjectHeader project={project} customers={customers} />
      </Suspense>

      <Suspense fallback={'Loading...'}>
        <ProjectTasksTable project={project} />
      </Suspense>

      <Suspense fallback={'Loading...'}>
        <ProjectInvoices invoices={invoices} templates={templates} />
      </Suspense>
    </div>
  );
}
