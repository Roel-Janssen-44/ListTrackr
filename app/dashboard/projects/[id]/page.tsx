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
import ProjectTitle from '@/app/components/projects/title';

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
      <div className="relative mb-24 flex flex-row justify-between gap-6 sm:mb-0 sm:justify-start">
        <PreviousPage />
        <h1 className="absolute left-0 top-full my-auto mt-6 w-full self-baseline text-center text-2xl font-bold sm:relative sm:mt-0">
          <ProjectTitle project={project} />
        </h1>
        <div className="flex flex-row justify-center gap-4">
          <DeleteProjectForm projectId={projectId} />
        </div>
      </div>
      <ProjectHeader project={project} customers={customers} />
      <ProjectTasksTable project={project} showTitle title="Tasks" />
      <ProjectInvoices
        projectId={projectId}
        invoices={invoices}
        templates={templates}
      />
    </div>
  );
}
